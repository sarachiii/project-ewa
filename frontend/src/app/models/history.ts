export class History {
  readonly timestamp: Date;
  readonly ghId: number;
  readonly airTempC: number;
  readonly airHumidity: number;
  readonly soilTempC: number;
  readonly soilHumidity: number;
  readonly soilMixId: number;
  readonly waterPh: number;
  readonly lightningRgb: string;
  readonly dailyExposure: number;
  readonly co2Level: number;

  constructor(timestamp?: Date, ghId?: number, airTempC?: number, airHumidity?: number,
              soilTempC?: number, soilHumidity?: number, soilMixId?: number, waterPh?: number,
              lightningRgb?: string, dailyExposure?: number, co2Level?: number) {
    this.timestamp = timestamp || new Date();
    this.ghId = ghId || 2;
    this.airTempC = airTempC || 0;
    this.airHumidity = airHumidity || 0;
    this.soilTempC = soilTempC || 0;
    this.soilHumidity = soilHumidity || 0;
    this.soilMixId = soilMixId || 0;
    this.waterPh = waterPh || 0;
    this.lightningRgb = lightningRgb || "#000000";
    this.dailyExposure = dailyExposure || 0;
    this.co2Level = co2Level || 0;
  }

  convertedDate(locale: string = 'en-GB', options?: Intl.DateTimeFormatOptions): string {
    if (!options) {
      options = {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit'
      };
    }
    return new Date(this.timestamp).toLocaleString(locale, options);
  }
}
