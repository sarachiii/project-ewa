import {Component, OnInit} from '@angular/core';
import {Factor, Sensor, ValueType} from "../../../models/sensor";
import {HttpClient} from "@angular/common/http";
import {NotificationsService} from "angular2-notifications";
import {SensorsService} from "../../../services/sensors.service";

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  providers: [SensorsService]
})
export class SensorComponent implements OnInit {

  sensorsData: any;
  alert: boolean = false
  sensors: Array<Sensor>;

  constructor(private http: HttpClient, private service: NotificationsService, private sensorsService: SensorsService) {
    this.sensors = Sensor.generateSensors();
    this.sensorsData = new Map();
    for (const sensor of this.sensors) {
      this.sensorsData.set(sensor.nameCamelCase, sensor)

    }

  }

  onSuccess(message) {
    this.service.success("Success", message, {
      position: ['bottom', 'left'],
      timeOut: 4000,
      animate: 'fade',
      showProgressBar: true
    });
    let postData = {
      ghId: 200,
      userId: 1,
      ...this.sensors.reduce((sensorsData, sensor) => {
        sensorsData[sensor.nameCamelCase] = sensor.value;

        return sensorsData
      }, {})
    }
    console.log(postData)
    this.sensorsService.postSensorData(postData)
      .subscribe(responseData =>
        console.log(responseData))
  }

  ngOnInit(): void {
    this.sensorsService.getSensorData(200).subscribe(response => {
      console.log(response)
      console.log(JSON.parse(response['msg']))
    })
    console.log(this.sensors)

  }


  decrementValue(sensor: Sensor): void {
    if (!isNaN(<number>sensor.value) && !isNaN(parseFloat(<string>sensor.value))) {
      sensor.value = parseFloat(<string>sensor.value);
      if (sensor.value >= sensor.numberRange[0] + 1 && sensor.value <= sensor.numberRange[1]) sensor.value--;
    }
  }

  incrementValue(sensor: Sensor): void {
    if (!isNaN(<number>sensor.value) && !isNaN(parseFloat(<string>sensor.value))) {
      sensor.value = parseFloat(<string>sensor.value);
      if (sensor.value >= sensor.numberRange[0] && sensor.value <= sensor.numberRange[1] - 1) sensor.value++;
    }
    this.alert = true
    // this.sensors.reset({})
  }


}
