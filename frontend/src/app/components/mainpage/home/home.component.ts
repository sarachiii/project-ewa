import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Chart} from "chart.js";
import {HistoryService} from "../../../services/history.service";

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

  protected sensors: Map<string, { [key: string]: string }>;


  constructor(private historyService: HistoryService) {
    this.sensors = new Map<string, { [key: string]: string }>();
    this.sensors.set("water_ph", { context: "baseChart", label: "Water pH" });
    this.sensors.set("air_temp_c", { context: "airTemperature", label: "Air temperature in C" });
    this.sensors.set("soil_temp_c", { context: "soilTemperature", label: "Soil temperature in C" });
    this.sensors.set("soil_humidity", { context: "soilHumidity", label: "Soil humidity in C" });
    this.sensors.set("soil_mix_id", { context: "soilmix", label: "Soil Mix" });
  }

  generateChart(context: string, labels: string[], data: number[], label: string = ""): Chart {
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
  }

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
