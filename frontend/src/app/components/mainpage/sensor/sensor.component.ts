import {Component, OnInit} from '@angular/core';
import {Factor, Sensor, ValueType} from "../../../models/sensor";
import {HttpClient} from "@angular/common/http";
import {NotificationsService} from "angular2-notifications";
import {SensorsService} from "../../../services/sensors.service";
import {interval, timer} from "rxjs";

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  providers: [SensorsService]
})
export class SensorComponent implements OnInit {

  factor = Factor;
  sensorsData: any;
  alert: boolean = false
  sensors: Sensor[];

  constructor(private http: HttpClient, private service: NotificationsService, private sensorsService: SensorsService) {
    // this.sensors = Sensor.generateSensors();
    this.sensors = [new Sensor("air_humidity", 1, 0, 100, 5, 90)];
    this.sensorsData = new Map();
    for (const sensor of this.sensors) {
      this.sensorsData.set(sensor.name, sensor)
    }
    this.sensors = this.sensorsService.findAll();
    console.log(this.sensorsData);
    this.sensorsService.getDesiredValues("2").subscribe(value => {
      console.log("", value)
    });

    timer(0, 5000).subscribe(t => {
      console.log(t);
      this.sensorsService.getCurrentData().toPromise().then((value) => {
        for (let i = 0; i < this.sensors.length; i++) {
          if (!isNaN(<number>this.sensors[i].currentValue) && !isNaN(parseFloat(<string>this.sensors[i].currentValue))) {
            this.sensors[i].currentValue = Math.round(value[this.sensors[i].name] * 100) / 100;
          } else {
            this.sensors[i].currentValue = value[this.sensors[i].name];
          }
        }
      })
    });
  }

  onSuccess(message) {
    this.service.success("Success", message, {
      position: ['bottom', 'left'],
      timeOut: 4000,
      animate: 'fade',
      showProgressBar: true
    });
    let postData = {
      "gh_id": 2,
      "user_id": 1,
      ...this.sensors.reduce((sensorsData, sensor) => {
        sensorsData[sensor.name] = sensor.desiredValue;
//TODO
        return sensorsData
      }, {})
    }
    console.log(postData);

    this.sensorsService.postSensorData(postData)
      .subscribe(responseData => console.log(responseData))
  }

  ngOnInit(): void {
    this.sensorsService.getSensorData(2).subscribe(response => {
      console.log(response)
      console.log(JSON.parse(response['msg']))
    })
    console.log(this.sensors)

  }


  decrementValue(sensor: Sensor): void {
    if (!isNaN(<number>sensor.desiredValue) && !isNaN(parseFloat(<string>sensor.desiredValue))) {
      sensor.desiredValue = parseFloat(<string>sensor.desiredValue);
      if (sensor.desiredValue > sensor.minValue && sensor.desiredValue <= sensor.maxValue) sensor.desiredValue--;
    }
  }

  incrementValue(sensor: Sensor): void {
    if (!isNaN(<number>sensor.desiredValue) && !isNaN(parseFloat(<string>sensor.desiredValue))) {
      sensor.desiredValue = parseFloat(<string>sensor.desiredValue);
      if (sensor.desiredValue > sensor.minValue && sensor.desiredValue < sensor.maxValue) sensor.desiredValue++;
    }
    this.alert = true
    // this.sensors.reset({})
  }
}
