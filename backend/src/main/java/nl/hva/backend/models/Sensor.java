package nl.hva.backend.models;


import javax.persistence.*;

/**
 * This is the model for all the sensors
 *
 * @author Jechillo Huang
 */
@Entity
@Table(name = "sensor")
public class Sensor {
    @Id
    @GeneratedValue
    @Column(name = "idx")
    private int idx;
    @Column(name = "name")
    private String name;
    @Column(name = "min_value")
    private Double minValue;
    @Column(name = "max_value")
    private Double maxValue;
    @Column(name = "units")
    private char units;

//    public int idx;
//    public String name;
//    public double minValue;
//    public double maxValue;
//    public char units;

    public Sensor(int idx, String name, double minValue, double maxValue, char units) {
        this.idx = idx;
        this.name = name;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.units = units;
    }

//    public Sensor(String name, double minValue, double maxValue, char units){
//        this(name, minValue, maxValue, units);
//    }

    public Sensor(){}

    public int getIdx() { return idx; }

    public void setIdx(int idx) { this.idx = idx; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public double getMinValue() { return minValue; }

    public void setMinValue(double minValue) { this.minValue = minValue; }

    public double getMaxValue() { return maxValue; }

    public void setMaxValue(double maxValue) { this.maxValue = maxValue; }

    public char getUnits() { return units; }

    public void setUnits(char units) { this.units = units; }

    //    public double airTemperature;
//    public double airHumidity;
//    public double soilTemperature;
//    public double soilHumidity;
//    public double waterPh;
//    public double dailyExposure;
//    public int soilMixID;
//    public int waterMixID;
//    public int lightingRGB;
//
//    public Sensor (double airTemperature, double airHumidity, double soilHumidity, double soilTemperature,
//                   double waterPh, double dailyExposure, int soilMixID, int waterMixID, int lightingRGB) {
//        this.airTemperature = airTemperature;
//        this.airHumidity = airHumidity;
//        this.soilHumidity = soilHumidity;
//        this.soilTemperature = soilTemperature;
//        this.waterPh = waterPh;
//        this.dailyExposure = dailyExposure;
//        this.soilMixID = soilMixID;
//        this.waterMixID = waterMixID;
//        this.lightingRGB = lightingRGB;
//    }
//
//    //Getters and setters
//
//    public double getAirTemperature() { return airTemperature; }
//
//    public void setAirTemperature(double airTemperature) { this.airTemperature = airTemperature; }
//
//    public double getAirHumidity() { return airHumidity; }
//
//    public void setAirHumidity(double airHumidity) { this.airHumidity = airHumidity; }
//
//    public double getSoilTemperature() { return soilTemperature; }
//
//    public void setSoilTemperature(double soilTemperature) { this.soilTemperature = soilTemperature; }
//
//    public double getSoilHumidity() { return soilHumidity; }
//
//    public void setSoilHumidity(double soilHumidity) { this.soilHumidity = soilHumidity; }
//
//    public double getWaterPh() { return waterPh; }
//
//    public void setWaterPh(double waterPh) { this.waterPh = waterPh; }
//
//    public double getDailyExposure() { return dailyExposure; }
//
//    public void setDailyExposure(double dailyExposure) { this.dailyExposure = dailyExposure; }
//
//    public int getSoilMixID() { return soilMixID; }
//
//    public void setSoilMixID(int soilMixID) { this.soilMixID = soilMixID; }
//
//    public int getWaterMixID() { return waterMixID; }
//
//    public void setWaterMixID(int waterMixID) { this.waterMixID = waterMixID; }
//
//    public int getLightingRGB() { return lightingRGB; }
//
//    public void setLightingRGB(int lightingRGB) { this.lightingRGB = lightingRGB; }
}

