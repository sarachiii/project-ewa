import {Component, OnDestroy, OnInit} from '@angular/core';
import {HistoryService} from "../../../services/history.service";
import {SensorsService} from "../../../services/sensors.service";
import {Sensor} from "../../../models/sensor";
import {UserService} from "../../../services/user.service";
import {Subscription, timer} from "rxjs";
import {History} from "../../../models/history";
import {skipWhile} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SensorsService, HistoryService]
})
export class HomeComponent implements OnInit, OnDestroy {
  page: number;
  pageCount: number;
  controlledSensor: Sensor | null;
  sensors: Sensor[];
  sensorsData: Map<string, (string | number)[]>
  private specialtyPrefs: Map<string, string> = new Map<string, string>([
    ["Agronomy", "soil_temp_c"],
    ["Botany", "daily_exposure"],
    ["Geology", "soil_humidity"],
    ["Hydrology", "water_ph"],
    ["Climate-Science", "air_humidity"]
  ]);
  private timerSubscription: Subscription;

  constructor(private historyService: HistoryService,
              private sensorsService: SensorsService,
              private userService: UserService) {
    this.sensors = [];
    this.controlledSensor = null;
    this.sensorsData = new Map<string, (string | number)[]>();
    this.page = 0;
    this.pageCount = 0;
  }

  ngOnInit(): void {
    this.userService.loggedUser$.pipe(skipWhile(value => Object.keys(value).length === 0))
      .subscribe(user => {
        this.sensorsService.getSensors().then(sensors => {
          // Sort sensors to show controlled element of specialty first
          this.sensors = sensors;
          this.controlledSensor = this.sensors.find(sensor => sensor.name == this.specialtyPrefs.get(user.specialty));

          this.setTimer();
        }).catch(console.error);
      })
  }

  ngOnDestroy(): void {
    this.timerSubscription && this.timerSubscription.unsubscribe();
  }

  setTimer(page: number = 0): void {
    this.timerSubscription && this.timerSubscription.unsubscribe();
    this.timerSubscription = timer(0, 60000).subscribe((tick) => {
      // Get the sensor data to populate charts/tables
      this.historyService.getHistory(2, page).toPromise().then((pagedHistory) => {
        this.pageCount = pagedHistory.pageCount;
        this.sensorsData.set('co2_level', pagedHistory.history.map((h) => h.co2Level));
        this.sensorsData.set('timestamp', pagedHistory.history.map((h) => h.convertedDate()));
        for (let sensor of this.sensors) {
          this.sensorsData.set(sensor.name, pagedHistory.history.map(h => h[sensor.nameCamelCase]));
        }
      }).catch(console.error);
    })
  }
}
