import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {Preferences} from "../../../models/preferences";
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

  constructor(protected settingsService: SettingsService,
              protected webStorageService: WebStorageService) {
    this.languages = [{ 'code': 'en_GB', 'lang': 'English'}, { 'code': 'nl_NL', 'lang': 'Dutch'}]
    this.prefsSaving = false;
    this.prefsFormInit();
  }

  ngOnInit(): void {
    this.settingsService.getPrefs(this.webStorageService.getAsNumber('userId')).subscribe(prefs => {
      Object.assign<Preferences, Preferences>(this.copyPrefs, prefs);
      this.onReset();
    })
  }

  get language() {
    return this.prefsForm.get('languageCode');
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
    if (this.prefsForm.valid) {
      let updatedPrefs: Preferences = <Preferences>{ ...this.copyPrefs, ...this.prefsForm.value }

      this.prefsSaving = true;
      this.settingsService.savePrefs(updatedPrefs)
        .then(result => {
          Object.assign(this.copyPrefs, result);
        }).catch(e => {
          console.error(e);
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
