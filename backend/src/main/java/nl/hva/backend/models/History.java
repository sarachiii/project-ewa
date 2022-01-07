package nl.hva.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.ZonedDateTime;

/**
 * this method <description of functionality
 *
 * @author Mohamad Hassan
 */
@Entity

@NamedQueries({
        @NamedQuery(name = "History.findAll", query = "SELECT h FROM History h ORDER BY h.timestamp DESC"),
        @NamedQuery(name = "History.findByGreenHouseId", query = "SELECT h FROM History h WHERE h.ghId = :ghId ORDER BY h.timestamp DESC"),
        @NamedQuery(name = "History.countAll", query = "SELECT COUNT(h.timestamp) FROM History h"),
        @NamedQuery(name = "History.countByGreenHouseId", query = "SELECT COUNT(h.timestamp) FROM History h WHERE h.ghId = :ghId")
})
public class History {

    @Id
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private ZonedDateTime timestamp;
    @Column(name = "gh_id")
    private long ghId;
    @Column(name = "air_temp_c")
    private double airTempC;
    @Column(name = "air_humidity")
    private double airHumidity;
    @Column(name = "soil_temp_c")
    private double soilTempC;
    @Column(name = "soil_humidity")
    private double soilHumidity;
    @Column(name = "soil_mix_id")
    private double soilMixId;
    @Column(name = "water_ph")
    private double waterPh;
    @Column(name = "water_mix_id")
    private double waterMixId;
    @Column(name = "lighting_rgb")
    private String lightingRgb;
    @Column(name = "daily_exposure")
    private double dailyExposure;
    @Column(name = "CO2_level")
    private double co2Level;


    public History() {
    }

    public History(ZonedDateTime timestamp, long ghId, double airTempC, double airHumidity, double soilTempC, double soilHumidity, double soilMixId, double waterPh, double waterMixId, String lightingRgb, double dailyExposure, double co2Level) {
        this.timestamp = timestamp;
        this.ghId = ghId;
        this.airTempC = airTempC;
        this.airHumidity = airHumidity;
        this.soilTempC = soilTempC;
        this.soilHumidity = soilHumidity;
        this.soilMixId = soilMixId;
        this.waterPh = waterPh;
        this.waterMixId = waterMixId;
        this.lightingRgb = lightingRgb;
        this.dailyExposure = dailyExposure;
        this.co2Level = co2Level;

    }

    public double getSoilHumidity() {
        return soilHumidity;
    }

    public void setSoilHumidity(double soilHumidity) {
        this.soilHumidity = soilHumidity;
    }

    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setGhId(long ghId) {
        this.ghId = ghId;
    }

    public void setAirTempC(double airTemp) {
        this.airTempC = airTemp;
    }

    public void setAirHumidity(double airHumidity) {
        this.airHumidity = airHumidity;
    }

    public void setSoilTempC(double soilTemp) {
        this.soilTempC = soilTemp;
    }

    public void setSoilMixId(double soilMixId) {
        this.soilMixId = soilMixId;
    }

    public void setWaterPh(double waterPh) {
        this.waterPh = waterPh;
    }

    public void setWaterMixId(double waterMixId) {
        this.waterMixId = waterMixId;
    }

    public void setLightingRgb(String lightingRgb) {
        this.lightingRgb = lightingRgb;
    }

    public void setDailyExposure(double dailyExposure) {
        this.dailyExposure = dailyExposure;
    }

    public void setCo2Level(double co2Level) {
        this.co2Level = co2Level;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public long getGhId() {
        return ghId;
    }

    public double getAirTempC() {
        return airTempC;
    }

    public double getAirHumidity() {
        return airHumidity;
    }

    public double getSoilTempC() {
        return soilTempC;
    }

    public double getSoilMixId() {
        return soilMixId;
    }

    public double getWaterPh() {
        return waterPh;
    }

    public double getWaterMixId() {
        return waterMixId;
    }

    public String getLightingRgb() {
        return lightingRgb;
    }

    public double getDailyExposure() {
        return dailyExposure;
    }

    public double getCo2Level() {
        return co2Level;
    }
}

