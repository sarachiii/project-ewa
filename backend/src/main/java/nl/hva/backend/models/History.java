package nl.hva.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * this method <description of functionality
 *
 * @author arashnasrat
 */
public class History {
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalDateTime timestamp;
    private Integer userId;
    /*Integer greenHouseId;*/
    private String sensorType;
    private String newValue;
    private String oldValue;

    public History(LocalDateTime timestamp, Integer userId, String sensorType, String newValue, String oldValue) {
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
        String[] sensors = { "airTempC", "airHumidity", "soilTempC", "soilHumidity", "soilMixId",
                "waterPh", "waterMixId", "lightingRgb", "dailyExposure", "co2Level" };
        for (int i = 0; i < 10; i++) {
            LocalDateTime timestamp = LocalDateTime.now().plusMinutes(i + 1);
            for (String sensor : sensors) {
                String value;
                switch (sensor) {
                    case "airTempC":
                    case "soilTempC":
                        value = String.valueOf((int)(Math.random() * 30 + 10));
                        break;
                    case "airHumidity":
                    case "soilHumidity":
                        value = String.valueOf((int)(Math.random() * (77) + 12));
                        break;
                    case "soilMixId":
                    case "waterMixId":
                        value = String.valueOf((int)(Math.random() * (9999) + 1));
                        break;
                    case "waterPh":
                        value = String.valueOf((int)(Math.random() * (3) + 5));
                        break;
                    case "lightingRgb":
                        value = "#" + Integer.toHexString((int)(Math.random() * (16777215)));
                        break;
                    case "dailyExposure":
                        value = String.valueOf((int)(Math.random() * (23) + 1));
                        break;
                    case "co2Level":
                        value = String.valueOf((int)(Math.random() * (1000) + 1000));
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
}