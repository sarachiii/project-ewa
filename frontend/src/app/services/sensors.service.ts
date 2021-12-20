import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Factor, Sensor} from "../models/sensor";

@Injectable()
export class SensorsService {
  private resourceUrl: URL;
  private sensors: Sensor[];

  constructor(protected http: HttpClient) {
    this.resourceUrl = new URL(environment.BACKEND_URL);
    this.sensors = [];

    this.getSensors().then((value) => {
      this.sensors.push(...value.map(sensor => Object.assign(new Sensor(), sensor)));
      this.getDesiredValues().toPromise().then((sensorData: any[]) => {
        for (let sd of sensorData) {
          let sensor: Sensor = this.sensors.find(sensor => sensor.id == sd["sensorId"]);
          sensor.desiredValue = sensor.sensorName != Factor.LIGHTING_RGB ? sd["value"] : "#" + sd["value"].toString(16);
        }
      })
    }).catch(console.error);
  }

  public findAll(): Sensor[] {
    return this.sensors;
  }

  postSensorData(postData: any) {
    //This method sends a Http request
    console.log(postData)

    return this.http.post(new URL(`sensors/data`, this.resourceUrl).toString(), postData);
    // return this.http.post(
    //   `http://www.sneltec.com/hva/hva.php?gh_id=${postData.ghId}&user_id=${postData.userId}&air_temp_c=${postData.airTemperature}&air_humidity=${postData.airHumidity}&soil_temp_c=${postData.soilTemperature}&soil_humidity=${postData.soilHumidity}&soil_mix_id=${postData.soilMixID}&water_ph=${postData.waterpH}&water_mix_id=${postData.waterMixID}&daily_exposure=${postData.exposure}`,
    //   postData)
    // return null;
  }

  getSensorData(ghId: number | string) {
    return this.http.get(`http://www.sneltec.com/hva/hva.php?gh_id=${ghId}`)
  }

  getCurrentData(ghId: number | string = 2): Observable<any> {
    return this.http.get(new URL(`sensors/data/api?id=${ghId}&view=raw`, this.resourceUrl).toString());
  }

  getDesiredValues(ghId: number | string = 2): Observable<any> {
    return this.http.get(new URL(`sensors/data/db?id=${ghId}`, this.resourceUrl).toString());
  }

  getSensors(): Promise<Sensor[]> {
    return this.http.get<Sensor[]>(new URL('sensors', this.resourceUrl).toString()).toPromise();
  }
}
