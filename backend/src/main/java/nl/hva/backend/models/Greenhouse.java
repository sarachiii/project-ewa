package nl.hva.backend.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */
@Entity
public class Greenhouse implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    @SequenceGenerator(name = "seq", sequenceName = "greenhouse_id_seq", allocationSize = 1)
    private long id;

    @Column(name = "CO2_level")
    private double co2Level;

    @OneToMany(mappedBy = "greenhouse")
    @Transient
    private List<SensorData> sensorData;

    public Greenhouse(double co2Level) {
        this.id = 0L;
        this.co2Level = co2Level;
    }

    protected Greenhouse() {
        this(0);
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getCo2Level() {
        return co2Level;
    }

    public void setCo2Level(double co2Level) {
        this.co2Level = co2Level;
    }
}
