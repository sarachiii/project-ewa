import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {History} from "../models/history";
import {map} from "rxjs/operators";
import {PagedHistory} from "../models/interfaces/paged-history";

@Injectable()
export class HistoryService{
  resourceUrl: URL;

  constructor(private httpClient: HttpClient) {
    this.resourceUrl = new URL(environment.apiUrl);
  }

  getHistory(ghId: number, page: number = 0, limit: number = 20): Observable<PagedHistory> {
    let url = new URL('/sensors/history', this.resourceUrl);
    url.searchParams.set('gh', ghId.toString());
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('page', page.toString())
    return this.httpClient.get<PagedHistory>(url.toString())
      .pipe( // Slice last limit designated records
        map(pagedHistory => {
          pagedHistory.history = pagedHistory.history.slice(-limit).reverse().map(history => Object.assign(new History(), history))
          return pagedHistory
        })
      );
  }
}
