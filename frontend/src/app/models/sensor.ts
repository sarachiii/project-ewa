enum InputType {
  COLOR = "color",
  TEXT = "text"
}

export enum ValueType {
  INTEGER = "integer",
  FLOAT = "float",
  STRING = "string"
}

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

export enum Unit {
  CELSIUS = "°C",
  PERCENTAGE = "%"
}


export class Sensor {
  // currentValue: any;
  // valueType: ValueType;
  // numberRange: Array<number>;
  readonly name: string;
  readonly id: number;
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

  get imagePath(): string {//air_temp_c
    return `assets/sensor/${this.name}.svg`
  }

  get nameHyphenated(): string {
    return this.name.toLowerCase().replace(/_/g, '-');
  }

  /*get nameCamelCase(): string {
    return this.name.replace(/(?<=_)(.)/g, '$1').replace(/^./, this.name[0].toLowerCase());
  }*/

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

// set value(value: number | string) {
//     if (this.valueType == ValueType.STRING) {
//       this._value = value;
//     } else {
//       this._value = value < this.numberRange[0] ? this.numberRange[0] : value > this.numberRange[1] ? this.numberRange[1] : value;
//     }
//   }
  //
  // public static generateSensors(): Array<Sensor> {
  //   let sensors: Array<Sensor> = [];
  //
  //   let names: Array<string> = Object.values(Factor);
  //
  //   for (const name of names) {
  //     let imagePath = `assets/sensor/${name.toLowerCase().replace(/\s/g, '-')}-sensor-image.svg`;
  //     let type = name == Factor.LIGHTING_RGB ? InputType.COLOR : InputType.TEXT;
  //     let sensor = new Sensor(name, imagePath, type, Math.floor(Math.random() * 10));
  //     switch (sensor.name) {
  //       case Factor.AIR_TEMP_C: {
  //         sensor.valueType = ValueType.FLOAT;
  //         sensor.numberRange = [-10, 40];
  //         break;
  //       }
  //       case Factor.AIR_HUMIDITY: {
  //         sensor.valueType = ValueType.FLOAT;
  //         sensor.numberRange = [0, 100];
  //
  //         break;
  //       }
  //       case Factor.SOIL_TEMP_C: {
  //         sensor.valueType = ValueType.FLOAT;
  //         sensor.numberRange = [-10, 40];
  //         break;
  //       }
  //       case Factor.SOIL_HUMIDITY: {
  //         sensor.valueType = ValueType.FLOAT;
  //         sensor.numberRange = [0, 100];
  //         break;
  //       }
  //       case Factor.SOIL_MIX_ID: {
  //         sensor.valueType = ValueType.INTEGER;
  //         sensor.numberRange = [0, 100];
  //         break;
  //       }
  //       case Factor.WATER_MIX_ID: {
  //         sensor.valueType = ValueType.FLOAT;
  //         sensor.numberRange = [0, 100];
  //         break;
  //       }
  //       case Factor.WATER_PH: {
  //         sensor.valueType = ValueType.FLOAT;
  //         sensor.numberRange = [0, 14];
  //         break;
  //       }
  //       case Factor.LIGHTING_RGB: {
  //         sensor.valueType = ValueType.STRING;
  //         break;
  //       }
  //       case Factor.EXPOSURE: {
  //         sensor.valueType = ValueType.INTEGER;
  //         sensor.numberRange = [0, 2000];
  //         break;
  //       }
  //     }
  //     sensors.push(sensor);
  //   }
  //
  //   return sensors;
  // }
}
