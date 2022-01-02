import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Factor, Sensor} from "../../../models/sensor";
import {HttpClient} from "@angular/common/http";
import {NotificationsService} from "angular2-notifications";
import {SensorsService} from "../../../services/sensors.service";
import {Subscription, timer} from "rxjs";
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {History} from "../../../models/history";
import {SensorData} from "../../../models/sensor-data";
import {TeamService} from "../../../services/team.service";
import {skipWhile} from "rxjs/operators";
import {Team} from "../../../models/team";

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  providers: [SensorsService, TeamService]
})
export class SensorComponent implements OnInit, OnDestroy {
  showSubmit = true;
  factor = Factor;
  sensorsData: any;
  alert: boolean = false
  sensors: Sensor[];
  co2level: number;
  sensorForm: FormGroup;
  records: History[];
  user: User | null;
  team: Team;
  private userSubscription: Subscription;
  private subscription: Subscription;

  constructor(private http: HttpClient,
              private service: NotificationsService,
              private sensorsService: SensorsService,
              private fb: FormBuilder,
              private webStorageService: WebStorageService,
              private userService: UserService,
              private teamService: TeamService) {

    this.records = [];
    this.sensors = [];
    this.team = new Team(0, 0);

    this.sensorForm = new FormGroup({
      airTempC: new FormControl(''),
      airHumidity: new FormControl({value: '', disabled: true}),
      soilTempC: new FormControl({value: '', disabled: true}),
      soilHumidity: new FormControl({value: '', disabled: true}),
      soilMixId: new FormControl(''),
      waterPh: new FormControl({value: '', disabled: true}),
      waterMixId: new FormControl(''),
      lightingRgb: new FormControl(''),
      dailyExposure: new FormControl({value: '', disabled: true})
    })

    this.sensorsService.getSensors().then(sensors => {
      for (const sensor of sensors) {
        this.sensorForm.get(sensor.nameCamelCase).setValidators([
          Validators.min(sensor.minValue),
          Validators.max(sensor.maxValue),
          Validators.required,
          Validators.pattern(/^\d*\.?\d*$/)
        ]);
      }
    });

    this.sensorsData = new Map();
    for (const sensor of this.sensors) {
      this.sensorsData.set(sensor.name, sensor)
    }
    this.sensors = this.sensorsService.findAll();

    this.subscription = timer(1000, 60000).subscribe(t => {
      this.sensorsService.getCurrentData().toPromise().then((value) => {
        this.co2level = Math.round(value["CO2_level"] * 100) / 100;
        for (let i = 0; i < this.sensors.length; i++) {
          if (!isNaN(value[this.sensors[i].name])) {
            this.sensors[i].currentValue = Math.round(value[this.sensors[i].name] * 100) / 100;
          } else {
            this.sensors[i].currentValue = value[this.sensors[i].name];
          }
        }
      });
      this.sensorsService.getDesiredValues(2).toPromise().then((sd) => {
        // There are no references that need the old array, so it can be replaced
        this.records = this.generateRecords(sd);
      });
    });
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.loggedUser$.pipe(skipWhile(value => Object.keys(value).length === 0)).subscribe(value => {
      this.user = value;
      this.teamService.getGreenhouseByTeamId(this.user.teamId).pipe(skipWhile(value => Object.keys(value).length === 0)).subscribe(team =>
        this.team = team)
      if (this.user.specialty === "Agronomy") {
        this.sensorForm.get('soilTempC').enable();
      } else if (this.user.specialty === "Botany") {
        this.sensorForm.get('dailyExposure').enable();
      } else if (this.user.specialty === "Geology") {
        this.sensorForm.get('soilHumidity').enable();
      } else if (this.user.specialty === "Hydrology") {
        this.sensorForm.get('waterPh').enable();
      } else if (this.user.specialty === "Agronomy") {
        this.sensorForm.get('airHumidity').enable();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  onSuccess(message) {
    this.showSubmit = false
    this.service.success("Success", message, {
      timeOut: 4000,
      animate: 'fade',
      showProgressBar: true
    });
    let postData = {
      "gh_id": this.team.ghId,
      "user_id": this.user.id,
      ...this.sensors.reduce((sensorsData, sensor) => {
        sensorsData[sensor.name] = sensor.desiredValue;
        return sensorsData
      }, {})
    }
    setTimeout(() => {
      this.showSubmit = true
    }, 5000);

    this.sensorsService.postSensorData(postData)
      .subscribe(responseData => {
        // generateRecords will only produce one record so deconstruct is allowed
        let [record] = this.generateRecords(responseData);
        this.records.pop();
        this.records.unshift(record);
      });
  }

  decrementValue(sensor: Sensor): void {
    if (!isNaN(<number>sensor.desiredValue) && !isNaN(parseFloat(<string>sensor.desiredValue))) {
      sensor.desiredValue = parseFloat(<string>sensor.desiredValue);
      if (sensor.desiredValue > sensor.minValue && sensor.desiredValue <= sensor.maxValue) sensor.desiredValue--;
    }
  }

  incrementValue(sensor: Sensor): void {
    if (!isNaN(<number>sensor.desiredValue) && !isNaN(parseFloat(<string>sensor.desiredValue))) {
      sensor.desiredValue = parseFloat(<string>sensor.desiredValue);
      if (sensor.desiredValue >= sensor.minValue && sensor.desiredValue < sensor.maxValue) sensor.desiredValue++;
    }
    this.alert = true
  }

  generateRecords(sensorData: SensorData[]): History[] {
    let records: History[] = [];
    let timestamps = [...new Set(sensorData.map(value => value.timestamp))];
    for (const timestamp of timestamps) {
      let record: History = new History();
      record.timestamp = timestamp;

      for (const sensor of this.sensors) {
        let sd = sensorData.find(value => value.sensorId == sensor.id && value.timestamp == timestamp);
        record[sensor.nameCamelCase] = sensor.sensorName == Factor.LIGHTING_RGB ? sd.getHexColor() : sd.value;
      }
      records.push(record);
    }
    return records;
  }
}

