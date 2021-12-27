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

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  providers: [SensorsService]
})
export class SensorComponent implements OnInit, OnDestroy {
  showSubmit = true;
  factor = Factor;
  sensorsData: any;
  alert: boolean = false
  sensors: Sensor[] = [];
  co2level: number;
  sensorForm: FormGroup;
  user: User | null;
  private userSubscription: Subscription;
  private subscription: Subscription;

  constructor(private http: HttpClient,
              private service: NotificationsService,
              private sensorsService: SensorsService,
              private fb: FormBuilder,
              private webStorageService: WebStorageService,
              private userService: UserService) {
    this.sensorForm = new FormGroup({});

    this.sensorForm = new FormGroup({
      airTempC: new FormControl(''),
      airHumidity: new FormControl(''),
      soilTempC: new FormControl(''),
      soilHumidity: new FormControl(''),
      soilMixId: new FormControl(''),
      waterPh: new FormControl(''),
      waterMixId: new FormControl(''),
      lightingRgb: new FormControl(''),
      dailyExposure: new FormControl('')
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

    console.log(this.sensorsData);
    this.sensorsService.getDesiredValues("2").subscribe(value => {
      console.log("", value)
    });

    this.subscription = timer(0, 5000).subscribe(t => {
      console.log(t);
      this.sensorsService.getCurrentData().toPromise().then((value) => {
        console.log(value)
        this.co2level = Math.round(value["CO2_level"] * 100) / 100;
        for (let i = 0; i < this.sensors.length; i++) {
          if (!isNaN(<number>this.sensors[i].currentValue) && !isNaN(parseFloat(<string>this.sensors[i].currentValue))) {
            this.sensors[i].currentValue = Math.round(value[this.sensors[i].name] * 100) / 100;
          } else {
            this.sensors[i].currentValue = value[this.sensors[i].name];
          }
        }
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSuccess(message) {
    console.log(this.sensorForm.value)
    this.showSubmit = false
    this.service.success("Success", message, {
      // position: ["top", "left"],
      timeOut: 4000,
      animate: 'fade',
      showProgressBar: true
    });
    let postData = {
      "gh_id": 2, //TODO, change to user gh...............
      "user_id": this.user.id,
      ...this.sensors.reduce((sensorsData, sensor) => {
        sensorsData[sensor.name] = sensor.desiredValue;
        return sensorsData
      }, {})
    }
    setTimeout(() => {
      this.showSubmit = true
    }, 5000);
    console.log(postData);
    this.sensorsService.postSensorData(postData).subscribe(responseData => console.log(responseData))
  }

  ngOnInit(): void {
    this.sensorsService.getSensorData(2).subscribe(response => {
      console.log(response)
      console.log(JSON.parse(response['msg']))
    })
    console.log(this.sensors)
    this.userSubscription = this.userService.loggedUser$.subscribe(value => {
      this.user = value;
      console.log(this.user);
    })
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
}

