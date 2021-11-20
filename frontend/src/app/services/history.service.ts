import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService{
  sensorHistory: any[][];

  constructor(private httpClient: HttpClient) {
    this.sensorHistory = [];
  }

  getSensorData(sensor: string = ""): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/sensor/history/${sensor}`);
  }
}
