package nl.hva.backend.repositories;

import nl.hva.backend.models.Sensor;
import nl.hva.backend.models.SensorData;
import nl.hva.backend.models.SensorDataPK;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Hashim
 */

@Repository
@Transactional
public class SensorRepository {

    public static final int SENSOR_ACTIVITY_LIMIT = 10;

    @PersistenceContext
    EntityManager entityManager;

    public List<Sensor> findAll() {
        TypedQuery<Sensor> namedQuery = entityManager.createNamedQuery("Sensor.findAll", Sensor.class);
        return namedQuery.getResultList();
    }

    public Sensor findById(long id) {
        return entityManager.find(Sensor.class, id);
    }

    public Sensor findByName(String name) {
        TypedQuery<Sensor> namedQuery = entityManager.createNamedQuery("Sensor.findByName", Sensor.class);
        namedQuery.setParameter("name", name);
        return namedQuery.getSingleResult();
    }

    public Sensor save(Sensor sensor) {
        return entityManager.merge(sensor);
    }

    public List<SensorData> findAllData() {
        TypedQuery<SensorData> namedQuery = entityManager.createNamedQuery("SensorData.findAll", SensorData.class);
        return namedQuery.getResultList();
    }

    public List<SensorData> findByGhId(long id) {
        return findByGhId(id, null);
    }

    public List<SensorData> findByGhId(long id, Integer limit) {
        TypedQuery<SensorData> namedQuery = entityManager.createNamedQuery("SensorData.findByGhId", SensorData.class);
        namedQuery.setParameter("ghId", id);
        if (limit != null) namedQuery.setMaxResults(limit);
        return namedQuery.getResultList();
    }

    public SensorData findDataById(ZonedDateTime timestamp, long greenhouseId, long sensorId) {
        return entityManager.find(SensorData.class, new SensorDataPK(timestamp, greenhouseId, sensorId));
    }

    public List<ZonedDateTime> getTimestampsByGhId(long id) {
        TypedQuery<ZonedDateTime> namedQuery = entityManager.createNamedQuery("SensorData.timestampsByGhId", ZonedDateTime.class);
        namedQuery.setParameter("ghId", id);
        return namedQuery.setMaxResults(SENSOR_ACTIVITY_LIMIT).getResultList();
    }

    public Long countTimestampsByGhId(long id) {
        TypedQuery<Long> namedQuery = entityManager.createNamedQuery("SensorData.countTimestampsByGhId", Long.class);
        namedQuery.setParameter("ghId", id);
        return namedQuery.getSingleResult();
    }

    public void deleteByGhIdExcludeTimestamps(long id, List<ZonedDateTime> timestamps) {

        entityManager.createNamedQuery("SensorData.deleteByGhIdExcludeTimestamps")
                .setParameter("ghId", id)
                .setParameter("timestamps", timestamps)
                .executeUpdate();
    }

    public SensorData saveData(SensorData sensorData) {
        return entityManager.merge(sensorData);
    }

    public List<SensorData> saveAll(List<SensorData> sensorData) {
        List<SensorData> savedSensorData = new ArrayList<>();
        for (SensorData sd : sensorData) {
            savedSensorData.add(saveData(sd));
        }
        return savedSensorData;
    }

    //Deletes a sensor
    public void deleteById(long id) {
        this.entityManager.createNamedQuery("Sensor.deleteById")
                .setParameter("id", id)
                .executeUpdate();
    }
}

