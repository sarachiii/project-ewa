package nl.hva.backend.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.util.JSONPObject;
import nl.hva.backend.models.History;
import nl.hva.backend.repositories.HistoryRepository;
import nl.hva.backend.rest.exception.BadRequestException;
import nl.hva.backend.rest.exception.PreConditionFailed;
import nl.hva.backend.rest.exception.ResourceNotFound;
import nl.hva.backend.rest.exception.SimulatorNotWorking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.sql.Wrapper;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/sensor/history")
public class HistoryController {
    @Autowired
    private HistoryRepository historyRepository;


    @Autowired
    @Qualifier("apiClient")
    private WebClient webClient;

    @Autowired
    private WebClient ccuApiClient;


    @GetMapping()
    public List<History> getAllSensorData(@RequestParam(required = false) String gh) {
        if (gh != null) {
            long id;
            try {
                id = Long.parseLong(gh);
            } catch (NumberFormatException e) {
                throw new PreConditionFailed("Enter a number value pleeeeeeeeeeeeeeeeeas!");
            }
            return historyRepository.findByGreenHouseId(id);
        }
        return historyRepository.findAll();
    }

    @PostMapping()
    public ResponseEntity<?> postData(@RequestBody History history) {
        History savedHistoryRecord = historyRepository.saveHistoryRecord(history);
        return ResponseEntity.ok().body(savedHistoryRecord);
    }

    @GetMapping("simulator")
    public ResponseEntity<JsonNode> getHistoryFromSimulator(@RequestParam(required = false) String gh) throws IOException {
        ResponseEntity<JsonNode> response;
/*        JsonNode jsonNode;
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectReader objectReader = new ObjectReader();*/
        /*"http://sneltec.com/hva/v2.php?gh_id=" + gh
         * */
        int greenHouseId;

        if (gh == null) {
            throw new BadRequestException("Enter the greenHousId (gr=)");
        }

        try {
            greenHouseId = Integer.parseInt(gh);
        } catch (NumberFormatException exception) {
            throw new PreConditionFailed("Enter a number value pleeeeeeeeeeeeeeeeeas!");
        }

        response = ccuApiClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("gh_id", String.valueOf(greenHouseId)).build())
                .retrieve().toEntity(JsonNode.class).block();

//        ResponseEntity<JsonNode> jsonpObject = response;
        if (response == null) {
            throw new ResourceNotFound("notfound");
        }
/*
        System.out.println("AAAAAAA" + response.getBody());
*/
        /*        if (gh != -1) {
            response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("gh_id", String.valueOf(gh)).build())
                    .retrieve().toEntity(JsonNode.class).block();
            jsonNode= response.getBody();
            objectMapper.readerFor(new TypeReference<List<String>>() {
            });
            List<String> list = objectReader.readValue(jsonNode);




            return response;
        } else {
            throw new PreConditionFailed();
        }
*/
        return response;
//        List<String> list = objectReader.readValue(jsonNode);

    }

    /*@Scheduled(fixedRate = 60000)
    public void scheduleSaveSensorData() {
        ResponseEntity<JsonNode> response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/sensors/data/api")
                        .queryParam("id", String.valueOf(2))
                        .queryParam("view", "raw")
                        .build())
                .retrieve().toEntity(JsonNode.class).block();

        System.out.println("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");

        if (response != null && response.getStatusCode().equals(HttpStatus.OK) && response.getBody() != null) {
            JsonNode responseNode = response.getBody();
            History history = new History(
//                    ZonedDateTime.parse(responseNode.get("date_time").asText()),
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
            history.setGhId(responseNode.get("gh_id").asLong());


            this.postData(history);
        }

    }
*/
}
