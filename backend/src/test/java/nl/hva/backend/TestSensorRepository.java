package nl.hva.backend;


import nl.hva.backend.models.Sensor;
import nl.hva.backend.models.SensorData;
import nl.hva.backend.repositories.SensorRepository;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Hashim Mohammad
 */
@Transactional
@SpringBootTest
public class TestSensorRepository {

    long ghId;

    @Autowired
    private SensorRepository sensorRepository;

    /**
     * @author Hashim Mohammad
     */
    @Test
    void testFindingSensorDataByGhId() {
        // Arrange
        ghId = 2L;
        long sensorId = 1L;
        int limit = 9;
        List<Sensor> sensors = sensorRepository.findAll();

        // Act: Get the latest sensor data
        List<SensorData> sensorData = sensorRepository.findByGhId(ghId, limit);
        List<String> sensorNames = sensors.stream().map(Sensor::getName).collect(Collectors.toList());

        // Assert: The sensor data is numbered in ascending order and by the timestamp in descending order
        assertEquals(ghId, sensorData.get(0).getGhId());
        assertEquals(sensorId, sensorData.get(0).getSensorId());
        assertTrue(sensorNames.contains(sensorData.get(0).getSensor().getName()));
    }

    /**
     * @author Hashim Mohammad
     */
    @Test
    void testGetTimestampsByGhId() {
        // Arrange: Get greenhouse id
        ghId = 2L;

        // Act: Get a list of timestamps and create a set of unique stamps
        List<ZonedDateTime> timestamps = sensorRepository.getTimestampsByGhId(ghId);
        Set<ZonedDateTime> uniqueTimestamps = new LinkedHashSet<>(timestamps); // Retain order of insertion

        // Assert: The size of timestamps should be less than or equal to the limit
        assertTrue(SensorRepository.SENSOR_ACTIVITY_LIMIT >= timestamps.size());
        assertArrayEquals(timestamps.toArray(), uniqueTimestamps.toArray()); // Timestamps should be unique
    }
}
