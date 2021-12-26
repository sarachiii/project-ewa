import {Component, HostBinding, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  private _screenHeight: number;
  private _screenWidth: number;

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
    if (this.sensorData) this.sensorData = [...this.sensorData].reverse();
    if (this.co2Levels) this.co2Levels = [...this.co2Levels].reverse();
    if (this.timestamps) this.timestamps = [...this.timestamps].reverse();
    this._asTable = value;
  }

  get screenHeight(): number {
    return this._screenHeight;
  }

  set screenHeight(value: number) {
    this._screenHeight = value;
  }

  get screenWidth(): number {
    return this._screenWidth;
  }

  set screenWidth(value: number) {
    this._screenWidth = value;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sensor.name != 'lighting_rgb') {
      this.chartData = {
        dataSets: [
          { data: <number[]>this.sensorData, label: this.sensor.sensorName, yAxisID: this.sensor.nameCamelCase },
          { data: <number[]>this.co2Levels, label: 'CO₂ level', yAxisID: 'co2Level' }
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
          }
        },
        colors: [
          { backgroundColor: `rgba(120, ${Math.floor(Math.random() * (100) + 100)}, 0, 0.3)` },
          { backgroundColor: 'rgb(95, 186, 233, 0.3)' }
        ],
        legend: true,
        plugins: []
      }
    } else {
      this.asTable = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event: Event): void {
    this._screenHeight = window.innerHeight;
    this._screenWidth = window.innerWidth;
    /*if (this._screenWidth <= 578 && !this.asTable) {
      this.asTable = true;
    } else if (this._screenWidth > 578) {
      this.asTable = false;
    }*/
  }

}
