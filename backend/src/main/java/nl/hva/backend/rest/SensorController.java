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
 * @author Jechillo Huang
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

    @Autowired
    private WebConfig webConfig;

    @GetMapping()
    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    @GetMapping("data/db")
    public List<SensorData> getSensorDataDB() {
        return sensorRepository.findAllData();
    }

    @GetMapping("data/api")
    public ResponseEntity<?> getSensorDataAPI(@RequestParam(required = false) Long id,
                                              @RequestParam(required = false) String view) {
        if (view != null && !view.equals("raw")) {
            throw new BadRequestException(String.format("Parameter view=%s is unacceptable, accepted values: raw", view));
        }
        /*RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        HttpEntity<?> httpEntity = new HttpEntity<>(headers);

        String url = UriComponentsBuilder.fromHttpUrl(webConfig.getCcuApiUrl())
                .queryParam("gh_id", 2)
                .encode().toUriString();

        HttpEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                httpEntity,
                String.class
        );

        return ResponseEntity.ok(response.getBody());*/

        // Get the greenhouse sensor data from the API
        ResponseEntity<ObjectNode> response = client.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("gh_id", 2)
                        .build())
                .retrieve()
                .toEntity(ObjectNode.class)
                .block();

        // If no response send error msg
        if (response == null) throw new ResourceNotFound("Could not connect to CCU API");

        ObjectNode responseNode = response.getBody();

        // If response hasn't a body send error msg
        if (responseNode == null) throw new ResourceNotFound("Empty response from CCU API");

        JsonNode errorNode = responseNode.get("errorList");

        // If there are errors return errors
        if (errorNode.isArray()) {
            if (errorNode.size() > 1) {
                return ResponseEntity.badRequest().body(errorNode.asText());
            }
        } else {
            throw new BadRequestException("CCU API response is no longer supported");
        }

        JsonNode sensorNode = responseNode.get("sensorInfoList").get(0);

        // If raw view is requested return CCU API response
        if (view != null) return ResponseEntity.ok(sensorNode);

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
    public ResponseEntity<?> postSensorData(@RequestBody ObjectNode sensorNode) {
        if (sensorNode == null) throw new BadRequestException("Empty body");
        /*if (!sensorNode.has(Sensor.Name.AIR_TEMP_C.toString())
                || !sensorNode.has(Sensor.Name.AIR_HUMIDITY.toString())
                || !sensorNode.has(Sensor.Name.SOIL_TEMP_C.toString())
                || !sensorNode.has(Sensor.Name.SOIL_HUMIDITY.toString())
                || !sensorNode.has(Sensor.Name.SOIL_MIX_ID.toString())
                || !sensorNode.has(Sensor.Name.WATER_PH.toString())
                || !sensorNode.has(Sensor.Name.WATER_MIX_ID.toString())
                || !sensorNode.has(Sensor.Name.LIGHTING_RGB.toString())
                || !sensorNode.has(Sensor.Name.DAILY_EXPOSURE.toString())) {
            throw new BadRequestException("Missing required fields");
        }*/

        // Prepare JSON to post to CCU API
        MultiValueMap<String, String> sensorJson = new LinkedMultiValueMap<>();

        Iterator<Map.Entry<String, JsonNode>> fields = sensorNode.fields();
        while (fields.hasNext()) {
            Map.Entry<String, JsonNode> field = fields.next();
            sensorJson.add(field.getKey(), field.getValue().asText());
        }

        ResponseEntity<ObjectNode> response = client.post()
                .uri(uriBuilder -> uriBuilder
                        .queryParams(sensorJson)
                        .build())
                .retrieve()
                .toEntity(ObjectNode.class)
                .block();

        if (response == null) throw new ResourceNotFound("Could not connect to CCU API");

        ObjectNode responseNode = response.getBody();

        if (responseNode == null) throw new ResourceNotFound("Empty response from CCU API");

        JsonNode errorNode = responseNode.get("errorList");

        if (!errorNode.isArray()) throw new BadRequestException("CCU API response is no longer supported");

        if (errorNode.size() > 1) return ResponseEntity.badRequest().body(errorNode);

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
                            sd.setValue(field.getKey().equals(Sensor.Name.LIGHTING_RGB.toString()) ?
                                    SensorData.fromHexColor(field.getValue().asText()) :
                                    field.getValue().asDouble());
                        });
            }
        }

        return ResponseEntity.ok(this.getSensorDataDB());
    }

    @PostMapping("add")
    public ResponseEntity<Sensor> saveSensor(@RequestBody Sensor sensor){
        Sensor savedSensor = sensorRepository.save(sensor);
        return ResponseEntity.ok().body(savedSensor);
    }

}
