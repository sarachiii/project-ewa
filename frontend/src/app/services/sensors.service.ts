import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Factor, Sensor} from "../models/sensor";
import {map, shareReplay} from "rxjs/operators";
import {SensorData} from "../models/sensor-data";

@Injectable()
export class SensorsService {
  private readonly resourceUrl: URL;
  private readonly sensors: Sensor[];

  constructor(protected http: HttpClient) {
    this.resourceUrl = new URL(environment.apiUrl);
    this.sensors = [];

    this.getSensors().then((value) => {
      this.sensors.push(...value);
      this.getDesiredValues(2, 9).toPromise().then((sensorData) => {
        for (let sd of sensorData) {
          let sensor: Sensor = this.sensors.find(sensor => sensor.id == sd.sensorId);
          sensor.desiredValue = sensor.sensorName != Factor.LIGHTING_RGB ? sd.value : sd.getHexColor();
        }
      })
    }).catch(console.error);
  }

  public findAll(): Sensor[] {
    return this.sensors;
  }

  postSensorData(postData: any): Observable<SensorData[]> {
    //This method sends a Http request
    return this.http.post<SensorData[]>(new URL(`sensors/data`, this.resourceUrl).toString(), postData).pipe(
      map(sensorData => sensorData.map(sd => Object.assign(new SensorData(), sd)))
    );
  }

  getCurrentData(ghId: number | string = 2): Observable<any> {
    // Create new url from the resource url with the correct endpoint
    let currentDataUrl = new URL(`sensors/data/api?id=${ghId}`, this.resourceUrl);

    // Add function parameter as query parameter
    currentDataUrl.searchParams.set("id", ghId.toString());

    // Send request to the backend
    return this.http.get(currentDataUrl.toString());
  }

  getDesiredValues(ghId: number | string = 2, limit?: number): Observable<SensorData[]> {
    // Create new url from the resource url with the correct endpoint
    let desiredValuesUrl = new URL('sensors/data/db', this.resourceUrl);

    // Add function parameters as query parameters
    desiredValuesUrl.searchParams.set('id', ghId.toString());
    if (limit) desiredValuesUrl.searchParams.set('limit', limit.toString());

    // Send request to the backend
    return this.http.get<SensorData[]>(desiredValuesUrl.toString()).pipe(
      map(sensorData => sensorData.map(sd => Object.assign(new SensorData(), sd)))
    );
  }

  getSensors(): Promise<Sensor[]> {
    // Convert sensor to Sensor object with map and repeat response
    return this.http.get<Sensor[]>(new URL('sensors', this.resourceUrl).toString()).pipe(
      map(sensors => sensors.map(sensor => Object.assign(new Sensor(), sensor))),
      shareReplay(1)
    ).toPromise();
  }
}
