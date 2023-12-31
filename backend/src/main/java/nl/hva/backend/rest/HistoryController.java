package nl.hva.backend.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.backend.models.History;
import nl.hva.backend.repositories.HistoryRepository;
import nl.hva.backend.rest.exception.BadRequestException;
import nl.hva.backend.rest.exception.PreConditionFailed;
import nl.hva.backend.rest.exception.ResourceNotFound;
import nl.hva.backend.services.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/sensors/history")
public class HistoryController {
    private static final int SENSOR_DATA_LIMIT_MIN = 10;
    private static final int SENSOR_DATA_LIMIT_MAX = 100;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private SensorService sensorService;

    @Autowired
    @Qualifier("apiClient")
    private WebClient webClient;

    @Autowired
    private WebClient ccuApiClient;

    @Autowired
    private ObjectMapper mapper;

    @GetMapping()
    public ResponseEntity<ObjectNode> getAllSensorData(@RequestParam(required = false) String gh,
                                                       @RequestParam(defaultValue = "10") String limit,
                                                       @RequestParam(defaultValue = "0") String page) {
        int lim;
        try {
            lim = Integer.parseInt(limit);
        } catch (NumberFormatException e) {
            throw new PreConditionFailed("Limit parameter value is not a number");
        }

        int p;
        try {
            p = Integer.parseInt(page);
        } catch (NumberFormatException e) {
            throw new PreConditionFailed("Page parameter value is not a number");
        }

        // If requested limit exceeds the data limit, set it to the data limit
        if (lim < SENSOR_DATA_LIMIT_MIN) lim = SENSOR_DATA_LIMIT_MIN;
        if (lim > SENSOR_DATA_LIMIT_MAX) lim = SENSOR_DATA_LIMIT_MAX;

        ObjectNode responseNode = mapper.createObjectNode();

        long id = 0;
        if (gh != null) {
            try {
                id = Long.parseLong(gh);
            } catch (NumberFormatException e) {
                throw new PreConditionFailed("Greenhouse parameter value is not a number");
            }
        }

        // Get the total count of entities in database
        long count = gh == null ? historyRepository.countAll() : historyRepository.countByGreenHouseId(id);

        int pageCount = (int) (count / lim);
        if (p > pageCount) p = pageCount;

        List<History> history = gh == null ? historyRepository.findAll(p, lim) : historyRepository.findByGreenHouseId(id, p, lim);

        responseNode.put("pageCount", pageCount);
        // Cast to ArrayNode because addAll is ambiguous
        responseNode.putArray("history").addAll((ArrayNode) mapper.valueToTree(history));


        return ResponseEntity.ok(responseNode);
    }

    @PostMapping()
    public ResponseEntity<?> postData(@RequestBody History history) {
        History savedHistoryRecord = historyRepository.save(history);
        return ResponseEntity.ok().body(savedHistoryRecord);
    }

    @GetMapping("simulator")
    public ResponseEntity<JsonNode> getHistoryFromSimulator(@RequestParam(required = false) String gh) {
        ResponseEntity<JsonNode> response;

        int greenHouseId;

        if (gh == null) {
            throw new BadRequestException("Missing required parameter gh value");
        }

        try {
            greenHouseId = Integer.parseInt(gh);
        } catch (NumberFormatException exception) {
            throw new PreConditionFailed("Parameter gh value is not a number");
        }

        response = ccuApiClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("gh_id", String.valueOf(greenHouseId)).build())
                .retrieve().toEntity(JsonNode.class).block();

        if (response == null) {
            throw new ResourceNotFound("Not Found");
        }

        return response;
    }

    /**
     * Periodically saves data to the history
     * Period = 60 seconds
     */
    @Scheduled(fixedRate = 60000)
    public void scheduleSaveSensorData() {
        // Populate query parameters
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("gh_id", String.valueOf(2));

        // Send request to the API
        ResponseEntity<JsonNode> response = this.sensorService.queryCcuApi(HttpMethod.GET, queryParams);

        // If everything went well, safe response to the database
        if (response != null && response.getStatusCode().equals(HttpStatus.OK) && response.getBody() != null) {
            JsonNode responseNode = response.getBody();
            History history = new History(
                    ZonedDateTime.now(),
                    responseNode.get("gh_id").asLong(),
                    responseNode.get("air_temp_c").asDouble(),
                    responseNode.get("air_humidity").asDouble(),
                    responseNode.get("soil_temp_c").asDouble(),
                    responseNode.get("soil_humidity").asDouble(),
                    responseNode.get("soil_mix_id").asDouble(),
                    responseNode.get("water_ph").asDouble(),
                    responseNode.get("water_mix_id").asDouble(),
                    responseNode.get("lighting_rgb").asText(),
                    responseNode.get("daily_exposure").asDouble(),
                    responseNode.get("CO2_level").asDouble()
            );

            this.postData(history);
        }

    }
}
