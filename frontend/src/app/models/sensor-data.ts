export class SensorData {
  public timestamp: Date;
  public ghId: number;
  public sensorId: number;
  public value: number;
  public userId: number;

  constructor(timestamp?: Date, ghId?: number, sensorId?: number, value?: number, userId?: number) {
    this.timestamp = timestamp || new Date();
    this.ghId = ghId || 0;
    this.sensorId = sensorId || 0;
    this.value = value || 0;
    this.userId = userId || 0;
  }

  getHexColor(): string {
    return `#${this.value.toString(16)}`
  }
}
