package nl.hva.backend.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.backend.models.Sensor;
import nl.hva.backend.models.SensorData;
import nl.hva.backend.models.User;
import nl.hva.backend.repositories.SensorRepository;
import nl.hva.backend.repositories.UserRepository;
import nl.hva.backend.rest.config.WebConfig;
import nl.hva.backend.rest.exception.BadRequestException;
import nl.hva.backend.rest.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;


/**
 * This method is the controller of all the sensors
 *
 * @author Hashim Mohammad
 */

@RestController
@RequestMapping("sensors")
public class SensorController {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Qualifier("ccuApiClient")
    private WebClient client;

    @GetMapping()
    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    @GetMapping("data/db")
    public List<SensorData> getSensorDataDB(@RequestParam(defaultValue = "2", required = false) String id) {
        long ghId = 2L;
        try {
            ghId = Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new BadRequestException("Id is wrong format: needs to be number");
        }
        return this.sensorRepository.findByGhId(ghId);
    }

    @GetMapping("data/api")
    public ResponseEntity<?> getSensorDataAPI(@RequestParam(defaultValue = "2",required = false) String id,
                                              @RequestParam(required = false) String view)
            throws BadRequestException, ResourceNotFound {
        if (view != null && !view.equals("raw"))
            throw new BadRequestException(String.format("Parameter view=%s is unacceptable, accepted values: raw", view));
        long ghId = 2L;
        try {
            ghId = Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new BadRequestException("Id is wrong format: needs to be number");
        }

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("gh_id", String.valueOf(ghId));

        ResponseEntity<JsonNode> response = queryCcuApi(HttpMethod.GET, queryParams);

        if (response.getStatusCode().equals(HttpStatus.BAD_REQUEST)) return response;

        if (response.getBody() == null) throw new ResourceNotFound("Sensor list is empty");

        // If raw view is requested return CCU API response
        if (view != null) return response;

        // Unwrap body to reach sensorNode
        JsonNode sensorNode = response.getBody();

        // Convert CCU API response to match database response
        List<Sensor> sensors = this.sensorRepository.findAll();
        List<SensorData> sensorData = new ArrayList<>();

        for (Sensor sensor : sensors) {
            double value = sensor.getName().equals("lighting_rgb") ?
                    SensorData.fromHexColor(sensorNode.get(sensor.getName()).asText()) :
                    sensorNode.get(sensor.getName()).asDouble();
            SensorData sd = new SensorData(sensorNode.get("gh_id").asLong(), sensor.getId(), value, sensorNode.get("user_id").asLong());
            sensorData.add(sd);
        }

        return ResponseEntity.ok(sensorData);
    }

    @PostMapping("data")
    public ResponseEntity<?> postSensorData(@RequestBody ObjectNode sensorNode,
                                            @RequestParam(required = false) String view) throws ResourceNotFound, BadRequestException{
        if (sensorNode == null) throw new BadRequestException("Empty body");
        if (view != null && !view.equals("raw"))
            throw new BadRequestException(String.format("Parameter view=%s is unacceptable, accepted values: raw", view));

        // Prepare JSON to post to CCU API
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();

        Iterator<Map.Entry<String, JsonNode>> fields = sensorNode.fields();
        while (fields.hasNext()) {
            Map.Entry<String, JsonNode> field = fields.next();
            queryParams.add(field.getKey(), field.getValue().asText());
        }

        ResponseEntity<JsonNode> response = queryCcuApi(HttpMethod.POST, queryParams);

        if (response.getStatusCode().equals(HttpStatus.BAD_REQUEST)) return response;

        List<SensorData> sensorData = this.sensorRepository.findAllData();
        fields = sensorNode.fields();
        while (fields.hasNext()) {
            Map.Entry<String, JsonNode> field = fields.next();
            if (Sensor.Name.has(field.getKey())) {
                sensorData.stream()
                        .filter(sd -> sd.getSensor().getName().equals(field.getKey())).findAny()
                        .ifPresent(sd -> {
                            sd.setGreenhouseId(sensorNode.get("gh_id").asLong());
                            sd.setUserId(sensorNode.get("user_id").asLong());
                            /*double value;
                            if (field.getKey().equals(Sensor.Name.LIGHTING_RGB.toString())) {
                                try {
                                    value = SensorData.fromHexColor(sensorNode.get(field.getKey()).asText());
                                } catch (NumberFormatException | IndexOutOfBoundsException e) {
                                    throw new BadRequestException(String.format("Sensor %s has malformed input value: %s", field.getKey(), field.getValue()));
                                }
                            } else {
                                value = sensorNode.get(field.getKey()).asDouble();
                            }*/
                            sd.setValue(field.getKey().equals(Sensor.Name.LIGHTING_RGB.toString()) ?
                                    SensorData.fromHexColor(field.getValue().asText()) :
                                    field.getValue().asDouble());
                        });
            }
        }

        return view == null ? ResponseEntity.ok(this.getSensorDataDB("2")) : this.getSensorDataAPI("2", view);
    }

    @PostMapping("add")
    public ResponseEntity<Sensor> saveSensor(@RequestBody Sensor sensor){
        Sensor savedSensor = sensorRepository.save(sensor);
        return ResponseEntity.ok().body(savedSensor);
    }

    /* HELPER METHODS */

    /**
     * Queries an API using query parameters
     *
     * @param wc the webclient
     * @param m the method
     * @param qp query params
     * @return ObjectNode
     */
    public ResponseEntity<ObjectNode> queryClient(WebClient wc, HttpMethod m, MultiValueMap<String, String> qp) {
        return wc.method(m)
                .uri(uriBuilder -> uriBuilder
                        .queryParams(qp)
                        .build())
                .retrieve()
                .toEntity(ObjectNode.class)
                .block();
    }

    public ResponseEntity<JsonNode> queryCcuApi(HttpMethod m, MultiValueMap<String, String> qp)
            throws ResourceNotFound {

        // Query the greenhouse from the API for sensor data
        ResponseEntity<ObjectNode> response = queryClient(client,  m, qp);

        // If no response send error msg
        if (response == null) throw new ResourceNotFound("Could not connect to CCU API");

        ObjectNode responseNode = response.getBody();

        // If response hasn't a body send error msg
        if (responseNode == null) throw new ResourceNotFound("Empty response from CCU API");

        JsonNode errorNode = responseNode.get("errorList");

        // If errorList is not an array or sensorInfoList doesn't exist
        if (!errorNode.isArray() || !responseNode.has("sensorInfoList"))
            throw new BadRequestException("CCU API response is no longer supported");

        // If there are errors return errors
        if (errorNode.size() >= 1) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorNode);

        return ResponseEntity.ok(responseNode.get("sensorInfoList").get(0));
    }

}
