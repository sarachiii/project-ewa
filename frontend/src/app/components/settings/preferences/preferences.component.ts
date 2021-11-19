import { Component, OnInit } from '@angular/core';
import { Role, User } from "../../../models/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {LanguageCode, Preferences} from "../../../models/preferences";
import {SettingsService} from "../../../services/settings.service";
import {WebStorageService} from "../../../services/storage/web-storage.service";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  copyPrefs: Preferences = <Preferences>{};
  prefsForm: FormGroup;
  languages: Array<{ [key: string]: string }>;
  prefsSaving: boolean;
  // prefsLoading: boolean;

  constructor(protected settingsService: SettingsService,
              protected webStorageService: WebStorageService) {
    //this.copyPrefs = Object.assign<Preferences, Preferences>(this.copyPrefs, this.user.preferences);
    // Object.assign<Preferences, Preferences>(this.copyPrefs, this.settingsService.getPrefs())
    this.languages = [{ 'code': 'en_GB', 'lang': 'English'}, { 'code': 'nl_NL', 'lang': 'Dutch'}]
    this.prefsSaving = false;
    // this.prefsLoading = true;
    this.prefsFormInit();
  }

  ngOnInit(): void {
    this.settingsService.getPrefs(this.webStorageService.getAsNumber('userId')).subscribe(prefs => {
      Object.assign<Preferences, Preferences>(this.copyPrefs, prefs);
      // this.prefsLoading = false;
      this.onReset();
    })
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
      languageCode: new FormControl('', Validators.required),
      colorblindness: new FormControl(''),
      darkMode: new FormControl('')
    })
  }

  onSubmit(): void {
    console.log(this.prefsForm.value);
    if (this.prefsForm.valid) {
      let updatedPrefs: Preferences = <Preferences>{ ...this.copyPrefs, ...this.prefsForm.value }

      this.prefsSaving = true;
      this.settingsService.savePrefs(updatedPrefs)
        .then(result => {
          console.log(result);
          Object.assign(this.copyPrefs, result);
        }).catch(e => {
          console.log(e);
        }).finally(() => {
          this.prefsSaving = false;
        });
    }
  }

  onReset(): void {
    this.prefsForm.reset();
    this.prefsFormInit()
    this.prefsForm.patchValue(this.copyPrefs);
  }
}
