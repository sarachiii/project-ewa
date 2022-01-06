package nl.hva.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.time.ZonedDateTime;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */

@Entity
@BatchSize(size = 10)
@IdClass(SensorDataPK.class)
@NamedQueries({
        @NamedQuery(name = "SensorData.findAll", query = "SELECT sd FROM SensorData sd ORDER BY sd.timestamp DESC, sd.sensorId ASC"),
        @NamedQuery(name = "SensorData.findByGhId", query = "SELECT sd FROM SensorData sd WHERE sd.ghId = :ghId ORDER BY sd.timestamp DESC, sd.sensorId ASC"),
        @NamedQuery(name = "SensorData.countTimestampsByGhId", query = "SELECT COUNT(DISTINCT sd.timestamp) FROM SensorData sd WHERE sd.ghId = :ghId"),
        @NamedQuery(name = "SensorData.timestampsByGhId", query = "SELECT DISTINCT sd.timestamp FROM SensorData sd WHERE sd.ghId = :ghId ORDER BY sd.timestamp DESC"),
        @NamedQuery(
                name = "SensorData.deleteByGhIdExcludeTimestamps",
                query = "DELETE FROM SensorData sd WHERE sd.ghId = :ghId AND sd.timestamp NOT IN :timestamps"
        )
})
public class SensorData {

    @Id
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private ZonedDateTime timestamp;

    @Id
    private long ghId;

    @Id
    private long sensorId;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("ghId")
    @JoinColumn(name = "gh_id")
    private Greenhouse greenhouse;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("sensorId")
    @JoinColumn(name = "sensor_id")
    private Sensor sensor;

    private double value;

    public SensorData(ZonedDateTime timestamp, long ghId, long sensorId, double value) {
        this.timestamp = timestamp;
        this.ghId = ghId;
        this.sensorId = sensorId;
        this.value = value;
    }

    protected SensorData() {
        this(null, 0, 0, 0);
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
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

    @JsonIgnore
    public Greenhouse getGreenhouse() {
        return greenhouse;
    }

    public void setGreenhouse(Greenhouse greenhouse) {
        this.greenhouse = greenhouse;
    }

    @JsonIgnore
    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    @JsonIgnore
    public String getHexColor() {
        return String.format("#%06x", (long) this.value);
    }

    @JsonIgnore
    public static double fromHexColor(String hexColor) throws NumberFormatException, IndexOutOfBoundsException {
        return Integer.parseInt(hexColor.substring(1, 7), 16);
    }
}
