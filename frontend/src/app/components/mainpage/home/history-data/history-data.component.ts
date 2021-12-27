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
  timestamps: (string | number)[];
  @Input()
  co2Levels: (string | number)[];
  @Input()
  sensorData: (string | number)[];
  chartData: ChartData | null;
  private _asTable: boolean;

  constructor() {
    this.sensor = null;
    this.co2Levels = [];
    this.sensorData = [];
    this.chartData = null;
    this._asTable = false;
  }

  get asTable(): boolean {
    return this._asTable;
  }

  set asTable(value: boolean) {
    this._asTable = value;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sensor.name != 'lighting_rgb') {
      this.chartData = {
        dataSets: [
          { data: <number[]>this.sensorData, label: this.sensor.sensorName, yAxisID: this.sensor.nameCamelCase, fill: false },
          { data: <number[]>this.co2Levels, label: 'CO₂ level', yAxisID: 'co2Level', fill: false }
        ],
        type: 'line',
        labels: <string[]>this.timestamps,
        options: {
          responsive: true,
          scales: {
            yAxes: [
              { id: this.sensor.nameCamelCase, type: 'linear', position: 'left', scaleLabel: { display: true, labelString: this.sensor.sensorName } },
              { id: 'co2Level', type: 'linear', position: 'right', scaleLabel: { display: true, labelString: 'CO₂ level' } }
            ],

          },
          animation: {
            duration: 0
          }
        },
        colors: [
          { borderColor: 'rgba(164, 218, 34)' },
          { borderColor: 'rgb(131, 174, 27)' }
        ],
        legend: true,
        plugins: []
      }
    } else {
      this.asTable = true;
    }
  }

}
