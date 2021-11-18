import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { Preferences } from "../models/preferences";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";

@Injectable()
export class SettingsService extends UserService {
  // prefsList: Preferences[];
  preferences: Preferences;

  // TODO: Add StorageService to save the preferences in the localStorage or sessionStorage
  // TODO: Perhaps separate SettingsService and PreferencesService to manage preferences site wide
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    // this.prefsList = [];
    // this.prefsList.push(new Preferences(this.loggedInUser().id));

    // console.log(this.prefsList)
  }

  updateProfile(id: number, accountForm: { [ key: string]: string }): Observable<boolean> {
    console.log(accountForm)
    return this.httpClient.put<boolean>(`${this.resourceUrl}/users/${id}/account`, accountForm);
  }

  getPrefs(id: number): Observable<Preferences> {
    return this.httpClient.get<Preferences>(`${this.resourceUrl}/users/preferences?id=${id}`)
  }

  savePrefs(prefs: Preferences): Promise<Preferences> {
    return this.httpClient.put<Preferences>(`${this.resourceUrl}/users/preferences`, prefs)
      .pipe(shareReplay(1)).toPromise();
  }

  // getPrefs(): Preferences {
  //   return this.prefsList.find(prefs => prefs.userId == this.loggedInUser().id);
  // }

  // savePrefs(preferences: Preferences): Promise<boolean> | boolean {
  //   let index = this.prefsList.findIndex(prefs => prefs.userId == this.loggedInUser().id);
  //   Object.assign<Preferences, Preferences>(this.prefsList[index], preferences);
  //   return true;
  // }
}
