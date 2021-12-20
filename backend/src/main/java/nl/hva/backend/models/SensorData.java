package nl.hva.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */

@Entity
@BatchSize(size = 10)
@IdClass(SensorDataPK.class)
@NamedQuery(name = "SensorData.findAll", query = "SELECT sd FROM SensorData sd")
public class SensorData {

    @Id
    private long greenhouseId;

    @Id
    private long sensorId;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("greenhouseId")
    @JoinColumn(name = "gh_id")
    private Greenhouse greenhouse;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("sensorId")
    @JoinColumn(name = "sensor_id")
    private Sensor sensor;

    private double value;

    @Column(name = "user_id")
    private long userId;

    @ManyToOne
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private User user;

    public SensorData(long greenhouseId, long sensorId, double value, long userId) {
        this.greenhouseId = greenhouseId;
        this.sensorId = sensorId;
        this.value = value;
        this.userId = userId;
    }

    protected SensorData() {
        this(0, 0, 0, 0);
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

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    @JsonIgnore
    public String getHexColor() {
        return String.format("#%06x", (long) this.value);
    }

    @JsonIgnore
    public static double fromHexColor(String hexColor) throws NumberFormatException, IndexOutOfBoundsException {
        return Integer.parseInt(hexColor.substring(1, 7), 16);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
