import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { Preferences } from "../models/preferences";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable()
export class SettingsService {
  protected resourceUrl: URL;
  preferences: Preferences;

  // TODO: Add StorageService to save the preferences in the localStorage or sessionStorage
  // TODO: Perhaps separate SettingsService and PreferencesService to manage preferences site wide
  constructor(protected httpClient: HttpClient) {
    this.resourceUrl = new URL(environment.apiUrl);
  }

  updateProfile(id: number, accountForm: { [ key: string]: string }): Observable<boolean> {
    console.log(accountForm)
    return this.httpClient.put<boolean>(`${this.resourceUrl}/users/${id}/account`, accountForm);
  }

  getPrefs(id: number): Observable<Preferences> {
    return this.httpClient.get<Preferences>(`${this.resourceUrl}/users/preferences?id=${id}`)
  }

  savePrefs(prefs: Preferences): Promise<Preferences> {
    return this.httpClient.put<Preferences>(`${this.resourceUrl}/users/preferences`, prefs).toPromise();
  }
}
