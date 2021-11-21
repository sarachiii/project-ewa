package nl.hva.backend.repositories;

import nl.hva.backend.models.Sensor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * This method creates an arraylist of all the sensors
 *
 * @author Jechillo Huang
 */

@Repository
public class SensorRepository {
    private final List<Sensor> sensors = new ArrayList<>();

    public Sensor save (Sensor sensor){
        sensors.add(sensor);
        return null;
    }

    public List<Sensor> findAll(){return sensors;}
}

