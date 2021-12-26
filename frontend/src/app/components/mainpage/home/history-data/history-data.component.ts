import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Sensor} from "../../../../models/sensor";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Color, Label, PluginServiceGlobalRegistrationAndOptions} from "ng2-charts";

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
  selector: 'app-history-data',
  templateUrl: './history-data.component.html',
  styleUrls: ['./history-data.component.css']
})
export class HistoryDataComponent implements OnInit, OnChanges {
  @Input()
  sensor: Sensor | null;
  @Input()
  co2Levels: (string | number)[];
  @Input()
  sensorData: (string | number)[];
  chartData: ChartData | null;
  asTable: boolean;


  constructor() {
    this.sensor = null;
    this.co2Levels = [];
    this.sensorData = [];
    this.chartData = null;
    this.asTable = false;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sensor.name != 'lighting_rgb') {
      this.chartData = {
        dataSets: [
          { data: this.sensorData?.map(value => value["newValue"]), label: this.sensor.sensorName, yAxisID: this.sensor.nameCamelCase },
          { data: this.co2Levels?.map(value => value["newValue"]), label: 'CO₂ level', yAxisID: 'co2Level' }
        ],
        type: 'line',
        labels: this.sensorData?.map(value => value["timestamp"]),
        options: {
          responsive: true,
          scales: {
            yAxes: [
              { id: this.sensor.nameCamelCase, type: 'linear', position: 'left', scaleLabel: { display: true, labelString: this.sensor.sensorName } },
              { id: 'co2Level', type: 'linear', position: 'right', scaleLabel: { display: true, labelString: 'CO₂ level' } }
            ],
          }
        },
        colors: [
          { backgroundColor: `rgba(120, ${Math.floor(Math.random() * (100) + 100)}, 0, 0.3)` },
          { backgroundColor: 'rgb(95, 186, 233, 0.3)' }
        ],
        legend: true,
        plugins: []
      }
    }
  }



}
