import {Component, OnInit} from '@angular/core';
import {Factor, Sensor, ValueType} from "../../../models/sensor";

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  sensors: Array<Sensor>;

  constructor() {
    this.sensors = Sensor.generateSensors();
  }

  ngOnInit(): void {
  }

  decrementValue(sensor: Sensor): void {
    if (!isNaN(<number>sensor.value) && !isNaN(parseFloat(<string>sensor.value))){
      sensor.value = parseFloat(<string>sensor.value);
      if (sensor.value >= sensor.numberRange[0] + 1 && sensor.value <= sensor.numberRange[1]) sensor.value--;
    }
  }

  incrementValue(sensor: Sensor): void {
    if (!isNaN(<number>sensor.value) && !isNaN(parseFloat(<string>sensor.value))){
      sensor.value = parseFloat(<string>sensor.value);
      if (sensor.value >= sensor.numberRange[0] && sensor.value <= sensor.numberRange[1] - 1) sensor.value++;
    }
  }
}
