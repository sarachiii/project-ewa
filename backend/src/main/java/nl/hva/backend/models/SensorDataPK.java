package nl.hva.backend.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */

@Embeddable
public class SensorDataPK implements Serializable {

    @Column
    private ZonedDateTime timestamp;

    @Column(name = "gh_id")
    private long ghId;

    @Column(name = "sensor_id")
    private long sensorId;

    public SensorDataPK(ZonedDateTime timestamp, long ghId, long sensorId) {
        this.timestamp = timestamp;
        this.ghId = ghId;
        this.sensorId = sensorId;
    }

    public SensorDataPK() {
        this(null, 0, 0);
    }

    public long getGhId() {
        return ghId;
    }

    public void setGhId(long ghId) {
        this.ghId = ghId;
    }

    public long getSensorId() {
        return sensorId;
    }

    public void setSensorId(long sensorId) {
        this.sensorId = sensorId;
    }
}
