import { Component, OnInit } from '@angular/core';
import { Role, User } from "../../../models/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {LanguageCode, Preferences} from "../../../models/preferences";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  user: User;
  copyPrefs: Preferences = <Preferences>{};
  prefsForm: FormGroup;
  languages: any;

  constructor() {
    this.user = new User(0, Role.ADMIN, "Botanist", "Sjors", "Peters",
      "https://yt3.ggpht.com/fAfB4LQvATPHhF9ou35zv5FZmXVhMtGnW_vZQNpyd_Krkzasu48k53I3UTIxcqNyMioqK4PR0w=s900-c-k-c0x00ffffff-no-rj",
      "sjors.peters@climatecleanup.org", "password1");
    this.copyPrefs = Object.assign<Preferences, Preferences>(this.copyPrefs, this.user.preferences);
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
      // TODO: Talk to service to talk with the backend
    } else {
      // fail
    }
  }

  onReset(): void {
    this.prefsForm.reset();
    this.prefsFormInit()
    this.prefsForm.patchValue(this.copyPrefs);
  }
}
