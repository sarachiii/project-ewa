package nl.hva.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

/**
 * this method <description of functionality
 *
 * @author Mohamad Hassan
 */
@Entity

@NamedQueries({
        @NamedQuery(name = "History.findAll", query = "SELECT h FROM History h ORDER BY h.timestamp DESC"),
        @NamedQuery(name = "History.findByGreenHouseId", query = "SELECT h FROM History h WHERE h.ghId= :ghid ORDER BY h.timestamp DESC")
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

    public static List<History> generateFakeData() {

        return null;
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

    public void setAirHumidity(double airHumidaity) {
        this.airHumidity = airHumidaity;
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
    //old code of Arash (hardCoded)
    /*

    private Integer userId;
    Integer greenHouseId;
    private String sensorType;
    private String newValue;
    private String oldValue;

    public History(LocalDateTime timestamp, Integer userId, String sensorType, String newValue, String oldValue) {
        this();
        this.timestamp = timestamp;
        this.userId = userId;
        this.sensorType = sensorType;
        this.newValue = newValue;
        this.oldValue = oldValue;
    }


    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getSensorType() {
        return sensorType;
    }

    public void setSensorType(String sensorType) {
        this.sensorType = sensorType;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public static List<History> generateFakeData() {
        List<History> sensorData = new ArrayList<>();
        String[] sensors = { "air_temp_c", "air_humidity", "soil_temp_c", "soil_humidity", "soil_mix_id",
                "water_ph", "water_mix_id", "lighting_rgb", "daily_exposure" };
        for (int i = 0; i < 10; i++) {
            LocalDateTime timestamp = LocalDateTime.now().plusMinutes(i + 1);
            for (String sensor : sensors) {
                String value;
                switch (sensor) {
                    case "air_temp_c":
                    case "soil_temp_c":
                        value = String.valueOf((int)(Math.random() * 30 + 10));
                        break;
                    case "air_humidity":
                    case "soil_humidity":
                        value = String.valueOf((int)(Math.random() * (77) + 12));
                        break;
                    case "soil_mix_id":
                    case "water_mix_id":
                        value = String.valueOf((int)(Math.random() * (9999) + 1));
                        break;
                    case "water_ph":
                        value = String.valueOf((int)(Math.random() * (3) + 5));
                        break;
                    case "lighting_rgb":
                        value = "#" + Integer.toHexString((int)(Math.random() * (16777215)));
                        break;
                    case "daily_exposure":
                        value = String.valueOf((int)(Math.random() * (23) + 1));
                        break;
                    default:
                        value = "";
                }
                History history = new History(timestamp, 1, sensor, value, "");
                sensorData.add(history);
            }
        }
        return sensorData;
    }

 */
}