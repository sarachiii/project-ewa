import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { Preferences } from "../models/preferences";

@Injectable()
export class SettingsService extends UserService {
  prefsList: Preferences[];
  // preferences: Preferences;

  // TODO: Add StorageService to save the preferences in the localStorage or sessionStorage
  // TODO: Perhaps separate SettingsService and PreferencesService to manage preferences site wide
  constructor() {
    super();
    this.prefsList = [];
    this.prefsList.push(new Preferences(this.loggedInUser().id));

    console.log(this.prefsList)
  }

  getPrefs(): Preferences {
    return this.prefsList.find(prefs => prefs.userId == this.loggedInUser().id);
  }

  savePrefs(preferences: Preferences): Promise<boolean> | boolean {
    let index = this.prefsList.findIndex(prefs => prefs.userId == this.loggedInUser().id);
    Object.assign<Preferences, Preferences>(this.prefsList[index], preferences);
    return true;
  }
}
