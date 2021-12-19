package nl.hva.backend.rest;

import nl.hva.backend.models.Sensor;
import nl.hva.backend.models.SensorData;
import nl.hva.backend.models.User;
import nl.hva.backend.repositories.SensorRepository;
import nl.hva.backend.repositories.UserRepository;
import nl.hva.backend.rest.config.WebConfig;
import nl.hva.backend.rest.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Iterator;
import java.util.List;


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

    @GetMapping()
    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    @GetMapping("data/db")
    public List<SensorData> getSensorDataDB() {
        return sensorRepository.findAllData();
    }

    @GetMapping("data/api")
    public List<SensorData> getSensorDataAPI() {
        client

        return sensorRepository.findAllData();
    }

    @PostMapping("data")
    public List<SensorData> postSensorData(@RequestBody List<SensorData> sensorData) {
        Sensor lightingSensor = sensorRepository.findByName("lighting_rgb");
        String color = "#000000";

        for (SensorData sd : sensorData) {
            Sensor sensor = sensorRepository.findById(sd.getSensorId());

            // Set color for API request
            if(sd.getSensorId() == lightingSensor.getId()) {
                color = sd.getHexColor();
            }

            if (sd.getValue() < sensor.getMinValue() || sd.getValue() > sensor.getMaxValue()) {
                throw new BadRequestException(String.format(
                        "Sensor %s is out of range: min: %.1f, max: %.1f",
                        sensor.getName(), sensor.getMinValue(), sensor.getMaxValue()
                ));
            }
            SensorData newData = sensorRepository.saveData(sd);
            /*User user = userRepository.findUserById(newData.getUserId());
            newData.setUser(user);*/
        }
        return this.getSensorDataDB();
    }

    @PostMapping("add")
    public ResponseEntity<Sensor> saveSensor(@RequestBody Sensor sensor){
        Sensor savedSensor = sensorRepository.save(sensor);
        return ResponseEntity.ok().body(savedSensor);
    }

}
