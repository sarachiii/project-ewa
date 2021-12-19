package nl.hva.backend.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */

@Embeddable
public class SensorDataPK implements Serializable {

    @Column(name = "gh_id")
    private long greenhouseId;

    @Column(name = "sensor_id")
    private long sensorId;

    public SensorDataPK(long greenhouseId, long sensorId) {
        this.greenhouseId = greenhouseId;
        this.sensorId = sensorId;
    }

    public SensorDataPK() {
        this(0 ,0);
    }

    public long getGreenhouseId() {
        return greenhouseId;
    }

    public void setGreenhouseId(long greenhouseId) {
        this.greenhouseId = greenhouseId;
    }

    public long getSensorId() {
        return sensorId;
    }

    public void setSensorId(long sensorId) {
        this.sensorId = sensorId;
    }
}
