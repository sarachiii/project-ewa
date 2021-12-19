package nl.hva.backend.models;


import javax.persistence.*;
import java.util.List;

/**
 * This is the model for all the sensors
 *
 * @author Hashim Mohammad & Jechillo Huang
 */
@Entity
@NamedQueries({
        @NamedQuery(name = "Sensor.findAll", query = "SELECT s FROM Sensor s"),
        @NamedQuery(name = "Sensor.findByName", query = "SELECT s FROM Sensor s WHERE s.name = :name")
})
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @Column(name = "min_value")
    private double minValue;

    @Column(name = "max_value")
    private double maxValue;

    @Column(name = "min_warning_value")
    private double minWarningValue;

    @Column(name = "max_warning_value")
    private double maxWarningValue;

    @OneToMany(mappedBy = "sensor")
    private List<SensorData> sensorData;

    public Sensor(String name, double minValue, double maxValue, double minWarningValue, double maxWarningValue) {
        this.id = 0L;
        this.name = name;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.minWarningValue = minWarningValue;
        this.maxWarningValue = maxWarningValue;
    }

    protected Sensor() {
        this("", 0, 0, 0, 0);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMinValue() {
        return minValue;
    }

    public void setMinValue(double minValue) {
        this.minValue = minValue;
    }

    public double getMaxValue() {
        return maxValue;
    }

    public void setMaxValue(double maxValue) {
        this.maxValue = maxValue;
    }

    public double getMinWarningValue() {
        return minWarningValue;
    }

    public void setMinWarningValue(double minWarningValue) {
        this.minWarningValue = minWarningValue;
    }

    public double getMaxWarningValue() {
        return maxWarningValue;
    }

    public void setMaxWarningValue(double maxWarningValue) {
        this.maxWarningValue = maxWarningValue;
    }
}

