package nl.hva.backend.repositories;

import nl.hva.backend.models.Sensor;
import nl.hva.backend.models.SensorData;
import nl.hva.backend.models.SensorDataPK;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * This method creates an arraylist of all the sensors
 *
 * @author Jechillo Huang
 */

@Repository
@Transactional
public class SensorRepository {

    @PersistenceContext
    EntityManager entityManager;

    public List<Sensor> findAll() {
        TypedQuery<Sensor> namedQuery = entityManager.createNamedQuery("Sensor.findAll", Sensor.class);
        return namedQuery.getResultList();
    }

    public List<SensorData> findAllData() {
        TypedQuery<SensorData> namedQuery = entityManager.createNamedQuery("SensorData.findAll", SensorData.class);
        return namedQuery.getResultList();
    }

    public Sensor findById(long sensorId) {
        return entityManager.find(Sensor.class, sensorId);
    }

    public Sensor findByName(String name) {
        TypedQuery<Sensor> namedQuery = entityManager.createNamedQuery("Sensor.findByName", Sensor.class);
        namedQuery.setParameter("name", name);
        return namedQuery.getSingleResult();
    }

    public Sensor save(Sensor sensor) {
        return entityManager.merge(sensor);
    }

    public SensorData saveData(SensorData sensorData) {
        return entityManager.merge(sensorData);
    }

    public void flush() {
        entityManager.flush();
    }
}

