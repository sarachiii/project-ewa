import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {History} from "../models/history";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HistoryService{
  sensorHistory: any[][];
  resourceUrl: URL;

  constructor(private httpClient: HttpClient) {
    this.sensorHistory = [];
    this.resourceUrl = new URL(environment.apiUrl);
  }

  getHistory(ghId: number): Observable<History[]> {
    let url = new URL('/sensors/history', this.resourceUrl);
    url.searchParams.set('gh', ghId.toString())
    return this.httpClient.get<History[]>(url.toString())
      .pipe( // Slice last 10 records
        map(histories => histories.slice(-10).reverse().map(history => Object.assign(new History(), history)))
      );
  }
}
