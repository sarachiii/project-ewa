import { Injectable } from '@angular/core';
import { Preferences } from "../models/preferences";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class SettingsService {
  protected resourceUrl: URL;
  preferences: Preferences;

  constructor(protected httpClient: HttpClient) {
    this.resourceUrl = new URL(environment.apiUrl);
  }

  updateProfile(id: number, accountForm: FormData): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.resourceUrl}/users/${id}/account`, accountForm);
  }

  getPrefs(id: number): Observable<Preferences> {
    return this.httpClient.get<Preferences>(`${this.resourceUrl}/users/preferences?id=${id}`)
  }

  savePrefs(prefs: Preferences): Promise<Preferences> {
    return this.httpClient.put<Preferences>(`${this.resourceUrl}/users/preferences`, prefs).toPromise();
  }
}
