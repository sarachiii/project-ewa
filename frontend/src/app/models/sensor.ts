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
  AIR_TEMP = "Air Temperature",
  SOIL_TEMP = "Soil Temperature",
  AIR_HUMIDITY = "Air Humidity",
  SOIL_HUMIDITY = "Soil Humidity",
  SOIL_MIX_ID = "Soil Mix ID",
  WATER_MIX_ID = "Water Mix ID",
  WATER_PH = "Water pH",
  LIGHTING = "Lighting",
  EXPOSURE = "Exposure"
}

export class Sensor {
  readonly name: string;
  readonly imagePath: string;
  readonly type: InputType;
  private _value: number | string;
  valueType: ValueType;
  numberRange: Array<number>;


  constructor(name: string, imagePath: string, type: InputType, value: number | string) {
    this.name = name;
    this.imagePath = imagePath;
    this.type = type;
    this._value = value;
  }

  get nameHypenated(): string{
    return this.name.toLowerCase().replace(/\s/g, '-');
  }

  get nameCamelCase(): string {
    return this.name.replace(/\s/g, '').replace(/^./, this.name[0].toLowerCase());
  }

  get value(): number | string {
    return this._value;
  }

  set value(value: number | string) {
    if (this.valueType == ValueType.STRING) {
      this._value = value;
    } else {
      this._value = value < this.numberRange[0] ? this.numberRange[0] : value > this.numberRange[1] ? this.numberRange[1] : value;
    }
  }

  public static generateSensors(): Array<Sensor> {
    let sensors: Array<Sensor> = [];

    let names: Array<string> = Object.values(Factor);

    for (const name of names) {
      let imagePath = `assets/sensor/${name.toLowerCase().replace(/\s/g, '-')}-sensor-image.svg`;
      let type = name == Factor.LIGHTING ? InputType.COLOR : InputType.TEXT;
      let sensor = new Sensor(name, imagePath, type, 1);
      switch (sensor.name) {
        case Factor.AIR_TEMP: {
          sensor.valueType = ValueType.FLOAT;
          sensor.numberRange = [-10, 40];
          break;
        }
        case Factor.AIR_HUMIDITY: {
          sensor.valueType = ValueType.FLOAT;
          sensor.numberRange = [0, 100];
          break;
        }
        case Factor.SOIL_TEMP: {
          sensor.valueType = ValueType.FLOAT;
          sensor.numberRange = [-10, 40];
          break;
        }
        case Factor.SOIL_HUMIDITY: {
          sensor.valueType = ValueType.FLOAT;
          sensor.numberRange = [0, 100];
          break;
        }
        case Factor.SOIL_MIX_ID: {
          sensor.valueType = ValueType.INTEGER;
          sensor.numberRange = [0, 100];
          break;
        }
        case Factor.WATER_MIX_ID: {
          sensor.valueType = ValueType.FLOAT;
          sensor.numberRange = [0, 100];
          break;
        }
        case Factor.WATER_PH: {
          sensor.valueType = ValueType.FLOAT;
          sensor.numberRange = [0, 14];
          break;
        }
        case Factor.LIGHTING: {
          sensor.valueType = ValueType.STRING;
          break;
        }
        case Factor.EXPOSURE: {
          sensor.valueType = ValueType.INTEGER;
          sensor.numberRange = [0, 2000];
          break;
        }
      }
      sensors.push(sensor);
    }

    return sensors;
  }
}
