import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Chart} from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  public lineChartData: ChartDataSets[] = [
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

  constructor() { }

  ngOnInit() {
    this.historyService.getSensorData().subscribe(value => {
      let types = value.map(sensor => sensor.sensorType).filter((v, i , a) => a.indexOf(v) === i);
      for (const type of types) {
        if(this.sensors.has(type)) {
          let sensor = value.filter(data => data.sensorType == type);
          let sensorData = sensor.map(record => record.newValue);
          let sensorDataLabels = sensor.map(record => record.timestamp);
          this.generateChart(this.sensors.get(type).context, sensorDataLabels, sensorData, this.sensors.get(type).label)
        }
      }
    })
  }
}
