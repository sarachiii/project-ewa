import { Component, OnInit } from '@angular/core';
import { Role, User } from "../../../models/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {LanguageCode, Preferences} from "../../../models/preferences";
import {SettingsService} from "../../../services/settings.service";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  copyPrefs: Preferences = <Preferences>{};
  prefsForm: FormGroup;
  languages: Array<{ [key: string]: string }>;

  constructor(protected settingsService: SettingsService) {
    //this.copyPrefs = Object.assign<Preferences, Preferences>(this.copyPrefs, this.user.preferences);
    Object.assign<Preferences, Preferences>(this.copyPrefs, this.settingsService.getPrefs())
    this.languages = [{ 'code': 'en_GB', 'lang': 'English'}, { 'code': 'nl_NL', 'lang': 'Dutch'}]
    this.prefsFormInit();
  }

  ngOnInit(): void {
    this.onReset();
  }

  get language() {
    return this.prefsForm.get('language');
  }

  get colorblindness() {
    return this.prefsForm.get('colorblindness');
  }

  get darkMode() {
    return this.prefsForm.get('darkMode');
  }

  private prefsFormInit() {
    this.prefsForm = new FormGroup({
      language: new FormControl('', Validators.required),
      colorblindness: new FormControl(''),
      darkMode: new FormControl('')
    })
  }

  onSubmit(): void {
    console.log(this.prefsForm.value)
    if (this.prefsForm.valid) {
      let updatedPrefs: Preferences = <Preferences>{ ...this.copyPrefs, ...this.prefsForm.value }
      this.settingsService.savePrefs(updatedPrefs);
      // TODO: Talk to service to talk with the backend
    }
  }

  onReset(): void {
    this.prefsForm.reset();
    this.prefsFormInit()
    this.prefsForm.patchValue(this.copyPrefs);
  }
}
