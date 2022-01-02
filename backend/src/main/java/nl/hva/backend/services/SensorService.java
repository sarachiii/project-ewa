package nl.hva.backend.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.backend.rest.exception.BadRequestException;
import nl.hva.backend.rest.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class SensorService {

    @Autowired
    @Qualifier("ccuApiClient")
    private WebClient client;

    /**
     * Queries an API using query parameters
     *
     * @param wc the webclient
     * @param m the request method
     * @param qp the query parameters
     * @return ObjectNode wrapped in a ResponseEntity
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

    /**
     * Queries the CCU API (simulator)
     *
     * @param m the request method
     * @param qp the query parameters
     * @return JsonNode wrapped in a ResponseEntity
     * @throws ResourceNotFound when connection problems with CCU API occur
     */
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
