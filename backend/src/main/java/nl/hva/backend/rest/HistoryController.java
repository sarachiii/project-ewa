package nl.hva.backend.rest;

import nl.hva.backend.models.History;
import nl.hva.backend.repositories.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sensor")
public class HistoryController {
    @Autowired
    private HistoryRepository historyRepository;

    @GetMapping("/history")
    public List<History> getAllSensorData() {
        return historyRepository.findAll();
    }

    @GetMapping("/history/{sensor}")
    public List<History> getSensorData(@PathVariable String sensor) {
        return historyRepository.findBySensor(sensor);
    }
}
