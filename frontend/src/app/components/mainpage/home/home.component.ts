import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label, PluginServiceGlobalRegistrationAndOptions, SingleOrMultiDataSet} from 'ng2-charts';
import {Chart} from "chart.js";
import {HistoryService} from "../../../services/history.service";
import {SensorsService} from "../../../services/sensors.service";
import {Sensor} from "../../../models/sensor";
import {EField} from "../../../models/field";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SensorsService]
})
export class HomeComponent implements OnInit  {
  sensors: Sensor[];
  sensorsData: Map<string, (string | number)[]>
  private specialtyPrefs: Map<string, string> = new Map<string, string>([
    ["Agronomy", "soil_temp_c"],
    ["Botany", "daily_exposure"],
    ["Geology", "soil_humidity"],
    ["Hydrology", "water_ph"],
    ["Climate Science", "air_humidity"]
  ]);

  constructor(private historyService: HistoryService,
              private sensorsService: SensorsService,
              private userService: UserService) {
    this.sensors = [];
    this.sensorsData = new Map<string, (string | number)[]>();
  }

  ngOnInit() {
    this.userService.loggedUser$.subscribe(value => {
      this.sensorsService.getSensors().then(sensors => {
        // Sort sensors to show controlled element of specialty first
        this.sensors = sensors.sort((sensorOne, sensorTwo) => sensorOne.name == this.specialtyPrefs.get(value.specialty) ? -1 : 0);

        // Get the sensor data and populate charts/tables
        this.historyService.getSensorData().subscribe((data: any[]) => {
          console.log(data);
          this.sensorsData.set('co2_level', data.filter(value => value["sensorType"] == "co2Level"));
          for (let sensor of this.sensors) {
            this.sensorsData.set(sensor.name, data.filter(value => value["sensorType"] == sensor.nameCamelCase));
          }
        })
      }).catch(console.error);
    })
  }
}
