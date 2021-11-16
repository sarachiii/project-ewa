package nl.hva.backend.rest;


import nl.hva.backend.models.Sensor;
import nl.hva.backend.repositories.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * This method is the controller of all the sensors
 *
 * @author Jechillo Huang
 */

@RestController
@RequestMapping("sensor/")
public class SensorController {

    public double sensor() {
        return 2.0;
    }

    @Autowired
    private SensorRepository sensorRepository;

    @GetMapping("all")
    public List<Sensor> getAllSensors() {return sensorRepository.findAll();}

    @PostMapping("add")
    public ResponseEntity<Sensor> saveSensor(@RequestBody Sensor sensor){
        sensorRepository.save(sensor);
                return ResponseEntity.ok().build();
    }

}
