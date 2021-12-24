import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label, PluginServiceGlobalRegistrationAndOptions, SingleOrMultiDataSet} from 'ng2-charts';
import {Chart} from "chart.js";
import {HistoryService} from "../../../services/history.service";
import {SensorsService} from "../../../services/sensors.service";
import {Sensor} from "../../../models/sensor";
import {EField} from "../../../models/field";
import {UserService} from "../../../services/user.service";

type ChartData = {
  type: ChartType,
  dataSets: ChartDataSets[],
  labels: Label[],
  options: ChartOptions,
  colors: Color[],
  legend: boolean,
  plugins: PluginServiceGlobalRegistrationAndOptions[]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SensorsService]
})
export class HomeComponent implements OnInit  {
  /*public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions | { annotation: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  protected sensors: Map<string, { [key: string]: string }>;*/

  sensors: Sensor[];
  data: Map<string, ChartData>;
  specialtyPrefs: Map<string, string> = new Map<string, string>([
    ["Agronomy", "soil_temp_c"],
    ["Botany","daily_exposure"],
    ["Geology","soil_humidity"],
    ["Hydrology","water_ph"],
    ["Climate Science","air_humidity"]
  ])

  constructor(private historyService: HistoryService,
              private sensorsService: SensorsService,
              private userService: UserService) {
    // this.sensors = this.sensorsService.findAll();
    this.sensors = [];
    this.data = new Map<string, ChartData>();
    /*this.sensors = new Map<string, { [key: string]: string }>();
    this.sensors.set("water_ph", { context: "baseChart", label: "Water pH" });
    this.sensors.set("air_temp_c", { context: "airTemperature", label: "Air temperature in C" });
    this.sensors.set("soil_temp_c", { context: "soilTemperature", label: "Soil temperature in C" });
    this.sensors.set("soil_humidity", { context: "soilHumidity", label: "Soil humidity in C" });
    this.sensors.set("soil_mix_id", { context: "soilmix", label: "Soil Mix" });*/
  }

  /*generateChart(context: string, labels: string[], data: number[], label: string = ""): Chart {
    return new Chart(context, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: [
            "rgba(120," + Math.floor(Math.random() * (100) + 100) + ",0,0.3)"
          ],
          borderColor: data.map(() => 'rgba(123,12,28,0.43)'),
          borderWidth: 1
        }]
      },
      options: {
        scales: {

        }
      }
    });
  }*/

  ngOnInit() {
    this.userService.loggedUser$.subscribe(value => {
      this.sensorsService.getSensors().then(sensors => {
        this.sensors = sensors.sort((sensorOne, sensorTwo) => sensorOne.name == this.specialtyPrefs.get(value.specialty) ? -1 : 0);
        console.log(this.sensors)
        for (let sensor of this.sensors) {
          if (sensor.name != 'lighting_rgb') {
            this.data.set(sensor.nameCamelCase, <ChartData>{
              dataSets: [
                { data: [], label: sensor.sensorName, yAxisID: sensor.nameCamelCase },
                { data: [], label: 'CO² Levels', yAxisID: 'co2Level' }
              ],
              type: 'line',
              labels: ["test"],
              options: {
                responsive: true,
                scales: {
                  yAxes: [
                    { id: sensor.nameCamelCase, type: 'linear', position: 'left', scaleLabel: { display: true, labelString: sensor.sensorName } },
                    { id: 'co2Level', type: 'linear', position: 'right', scaleLabel: { display: true, labelString: 'CO² Levels' } }
                  ],
                }
              },
              colors: [ { backgroundColor: "rgba(120," + Math.floor(Math.random() * (100) + 100) + ",0,0.3)" } ],
              legend: true,
              plugins: []
            })
          }
        }

        this.historyService.getSensorData().subscribe((data: any[]) => {
          console.log(data);
          for (let sensor of this.sensors) {
            if (sensor.name != 'lighting_rgb') {
              let charData: ChartData = this.data.get(sensor.nameCamelCase);
              let sensorData = data.filter(value => value["sensorType"] == sensor.nameCamelCase);

              charData.dataSets[0].data = sensorData.map(value => value["newValue"]);
              charData.dataSets[1].data = data.filter(value => value["sensorType"] == "co2Level").map(value => value["newValue"]);
              charData.labels = sensorData.map(value => value["timestamp"]);
              console.log(charData.dataSets[0].data)
            } else {

            }
          }
        })
      }).catch(console.error);

    })

    /*this.historyService.getSensorData().subscribe(value => {
      let types = value.map(sensor => sensor.sensorType).filter((v, i , a) => a.indexOf(v) === i);
      for (const type of types) {
        if(this.sensors.has(type)) {
          let sensor = value.filter(data => data.sensorType == type);
          let sensorData = sensor.map(record => record.newValue);
          let sensorDataLabels = sensor.map(record => record.timestamp);
          this.generateChart(this.sensors.get(type).context, sensorDataLabels, sensorData, this.sensors.get(type).label)
        }
      }
    })*/
  }
}
