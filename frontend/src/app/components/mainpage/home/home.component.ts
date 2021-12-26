import {AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label, PluginServiceGlobalRegistrationAndOptions, SingleOrMultiDataSet} from 'ng2-charts';
import {Chart} from "chart.js";
import {HistoryService} from "../../../services/history.service";
import {SensorsService} from "../../../services/sensors.service";
import {Sensor} from "../../../models/sensor";
import {EField} from "../../../models/field";
import {UserService} from "../../../services/user.service";
import {History} from "../../../models/history";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SensorsService]
})
export class HomeComponent implements OnInit {
  selectedSensor: Sensor | null;
  sensors: Sensor[];
  sensorsData: Map<string, (string | number)[]>
  private specialtyPrefs: Map<string, string> = new Map<string, string>([
    ["Agronomy", "soil_temp_c"],
    ["Botany", "daily_exposure"],
    ["Geology", "soil_humidity"],
    ["Hydrology", "water_ph"],
    ["Climate Science", "air_humidity"]
  ]);

  isActive: boolean;

  constructor(private historyService: HistoryService,
              private sensorsService: SensorsService,
              private userService: UserService,
              private cdRef: ChangeDetectorRef) {
    this.sensors = [];
    this.selectedSensor = null;
    this.sensorsData = new Map<string, (string | number)[]>();
  }

  ngOnInit() {
    this.userService.loggedUser$.subscribe(value => {
      this.sensorsService.getSensors().then(sensors => {
        // Sort sensors to show controlled element of specialty first
        this.sensors = sensors;//.sort((sensorOne) => sensorOne.name == this.specialtyPrefs.get(value.specialty) ? -1 : 0);
        this.selectedSensor = this.sensors.find(sensor => sensor.name == this.specialtyPrefs.get(value.specialty));

        // Get the sensor data to populate charts/tables
        this.historyService.getSensorData(2).subscribe((history) => {
          this.sensorsData.set('co2_level', history.map((h) => h.co2Level));
          this.sensorsData.set('timestamp', history.map((h) => h.convertedDate()));
          for (let sensor of this.sensors) {
            this.sensorsData.set(sensor.name, history.map(h => h[sensor.nameCamelCase]));
          }
        })
      }).catch(console.error);
    })
  }

}
