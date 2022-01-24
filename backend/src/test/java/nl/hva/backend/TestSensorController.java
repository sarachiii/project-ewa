package nl.hva.backend;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.backend.models.Sensor;
import nl.hva.backend.models.SensorData;
import nl.hva.backend.rest.SensorController;
import nl.hva.backend.services.SensorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

/**
 * @author Hashim Mohammad
 */
@SpringBootTest
@Transactional
public class TestSensorController {

    @MockBean
    private SensorService sensorService;

    @Autowired
    private SensorController sensorController;

    @Autowired
    private ObjectMapper mapper;

    /**
     * @author Hashim Mohammad
     */
    @Test
    @DirtiesContext
    void testPostSensorData() {
        // Arrange
        // Retrieve all sensors
        List<Sensor> sensors = sensorController.getAllSensors();
        // Prepare node for request
        ObjectNode sensorNode = mapper.createObjectNode();
        long ghId = 2;
        long userId = 1;
        sensorNode.put("gh_id", ghId);
        sensorNode.put("user_id", userId);
        for (Sensor sensor : sensors) {
            String value = String.valueOf(
                    Math.random() * (sensor.getMaxValue() - sensor.getMinValue()) + sensor.getMinValue()
            );
            sensorNode.put(
                    sensor.getName(),
                    sensor.getName().equals(Sensor.Name.LIGHTING_RGB.toString()) ?
                    String.format("#%06x", Double.valueOf(value).longValue()) : value
            );
        }

        // Mock response from simulator
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();

        Iterator<Map.Entry<String, JsonNode>> fields = sensorNode.fields();
        while (fields.hasNext()) {
            Map.Entry<String, JsonNode> field = fields.next();
            queryParams.add(field.getKey(), field.getValue().asText());
        }

        when(sensorService.queryCcuApi(HttpMethod.POST, queryParams)).thenReturn(ResponseEntity.ok(sensorNode));

        // Act: Post the data
        ResponseEntity<?> creationResult = sensorController.postSensorData(sensorNode, null);

        // Assert: Response should return ok status
        assertEquals(HttpStatus.OK, creationResult.getStatusCode());

        // Arrange
        @SuppressWarnings("unchecked") // On successful response, body is a list of sensor data
        List<SensorData> sensorData = (List<SensorData>) creationResult.getBody();

        // Assert: sensorData shouldn't be null
        assertNotNull(sensorData);
        // Assert that all data values match with the original request
        for (SensorData data : sensorData) {
            Sensor sensor = sensors.stream().filter(s -> s.getId() == data.getSensorId()).findFirst().orElse(null);
            // Should be able to find a sensor for each data
            assertNotNull(sensor);
            // If the sensor is color get hex color else just the value
            assertEquals(
                    sensorNode.get(sensor.getName()).asText(),
                    sensor.getName().equals(Sensor.Name.LIGHTING_RGB.toString()) ?
                    data.getHexColor() : String.valueOf(data.getValue())
            );
        }
    }
}
