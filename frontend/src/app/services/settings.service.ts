import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { Preferences } from "../models/preferences";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";

@Injectable()
export class SettingsService extends UserService {
  // prefsList: Preferences[];
  private readonly resourceUrl: string = 'http://localhost:8084';
  preferences: Preferences;

  // TODO: Add StorageService to save the preferences in the localStorage or sessionStorage
  // TODO: Perhaps separate SettingsService and PreferencesService to manage preferences site wide
  constructor(private httpClient: HttpClient) {
    super();
    // this.prefsList = [];
    // this.prefsList.push(new Preferences(this.loggedInUser().id));

    // console.log(this.prefsList)
  }

  getPrefs(): Observable<Preferences> {
    return this.httpClient.get<Preferences>(`${this.resourceUrl}/users/preferences?id=${this.loggedInUser().id}`)
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
