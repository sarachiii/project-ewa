package nl.hva.backend.repositories;

import nl.hva.backend.models.History;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class HistoryRepository {
    private final List<History> sensorData;

    public HistoryRepository() {
        sensorData = History.generateFakeData();
        System.out.println(sensorData);
    }

    public List<History> findAll() {
        return sensorData;
    }

    public List<History> findBySensor(String sensor) {
        return findAll().stream().filter(history -> history.getSensorType().equals(sensor)).collect(Collectors.toList());
    }
}
