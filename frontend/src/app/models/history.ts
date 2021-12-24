export class History {
  private timestamp: Date;
  private ghId: number;
  private airTempC: number;
  private airHumidity: number;
  private soilTempC: number;
  private soilHumidity: number;
  private soilMixId: number;
  private waterPh: number;
  private lightningRgb: string;
  private dailyExposure: number;
  private co2Level: number;

  constructor(timestamp: Date, ghId: number, airTempC: number, airHumidity: number,
              soilTempC: number, soilHumidity: number, soilMixId: number, waterPh: number,
              lightningRgb: string, dailyExposure: number, co2Level: number) {
    this.timestamp = timestamp;
    this.ghId = ghId;
    this.airTempC = airTempC;
    this.airHumidity = airHumidity;
    this.soilTempC = soilTempC;
    this.soilHumidity = soilHumidity;
    this.soilMixId = soilMixId;
    this.waterPh = waterPh;
    this.lightningRgb = lightningRgb;
    this.dailyExposure = dailyExposure;
    this.co2Level = co2Level;
  }
}
