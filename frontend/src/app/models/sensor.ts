export enum Factor {
  AIR_TEMP_C = "Air Temperature",
  SOIL_TEMP_C = "Soil Temperature",
  AIR_HUMIDITY = "Air Humidity",
  SOIL_HUMIDITY = "Soil Humidity",
  SOIL_MIX_ID = "Soil Mix ID",
  WATER_MIX_ID = "Water Mix ID",
  WATER_PH = "Water pH",
  LIGHTING_RGB = "Lighting",
  DAILY_EXPOSURE = "Exposure"
}

export class Sensor {
  readonly id: number;
  readonly name: string;
  readonly minValue: number;
  readonly maxValue: number;
  readonly minWarningValue: number;
  readonly maxWarningValue: number;

  private _desiredValue: number | string;
  private _currentValue: number | string;

  // Keys named with underscore to adhere to CCU API
  static readonly sensorNames = {
    'air_temp_c': 'Air Temperature',
    'soil_temp_c': 'Soil Temperature',
    'air_humidity': 'Air Humidity',
    'soil_humidity': 'Soil Humidity',
    'soil_mix_id': 'Soil Mix ID',
    'water_mix_id': 'Water Mix ID',
    'water_ph': 'Water pH',
    'lighting_rgb': 'Lighting',
    'daily_exposure': 'Exposure'
  };

  constructor(name?: string, id?: number, minValue?: number, maxValue?: number, minWarningValue?: number, maxWarningValue?: number) {
    this.name = name || "";
    this.id = id || 0;
    this.minValue = minValue || 0;
    this.maxValue = maxValue || 0;
    this.minWarningValue = minWarningValue || 0;
    this.maxWarningValue = maxWarningValue ||0;
  }

  get sensorName(): string {
    return Sensor.sensorNames[this.name];
}

  get imagePath(): string {
    return `assets/images/sensor/${this.name}.svg`
  }

  get nameHyphenated(): string {
    return this.name.toLowerCase().replace(/_/g, '-');
  }

  get nameCamelCase(): string {
    return this.name.replace(/(_(.))/g, (m, p1, p2) => p2.toUpperCase());
  }

  get desiredValue(): number | string {
    return this._desiredValue || this.minValue;
  }

  set desiredValue(desiredValue: number | string) {
    this._desiredValue = desiredValue;
  }

  get currentValue(): number | string {
    return this._currentValue;
  }

  set currentValue(value: number | string) {
    this._currentValue = value;
  }
}
