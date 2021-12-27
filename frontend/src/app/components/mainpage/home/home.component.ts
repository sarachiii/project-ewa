import { Component, OnDestroy, OnInit } from '@angular/core';
import {HistoryService} from "../../../services/history.service";
import {SensorsService} from "../../../services/sensors.service";
import {Sensor} from "../../../models/sensor";
import {UserService} from "../../../services/user.service";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SensorsService]
})
export class HomeComponent implements OnInit, OnDestroy {
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
  private timerSubscription: Subscription;

  constructor(private historyService: HistoryService,
              private sensorsService: SensorsService,
              private userService: UserService) {
    this.sensors = [];
    this.selectedSensor = null;
    this.sensorsData = new Map<string, (string | number)[]>();
  }

  ngOnInit(): void {
    this.userService.loggedUser$.subscribe(value => {
      this.sensorsService.getSensors().then(sensors => {
        // Sort sensors to show controlled element of specialty first
        this.sensors = sensors;//.sort((sensorOne) => sensorOne.name == this.specialtyPrefs.get(value.specialty) ? -1 : 0);
        this.selectedSensor = this.sensors.find(sensor => sensor.name == this.specialtyPrefs.get(value.specialty));

        this.timerSubscription = timer(0, 60000).subscribe(() => {
          // Get the sensor data to populate charts/tables
          this.historyService.getHistory(2).toPromise().then((history) => {
            this.sensorsData.set('co2_level', history.map((h) => h.co2Level));
            this.sensorsData.set('timestamp', history.map((h) => h.convertedDate()));
            for (let sensor of this.sensors) {
              this.sensorsData.set(sensor.name, history.map(h => h[sensor.nameCamelCase]));
            }
          }).catch(console.error);
        })
      }).catch(console.error);
    })
  }

  ngOnDestroy(): void {
    this.timerSubscription && this.timerSubscription.unsubscribe();
  }
}
