import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreferencesComponent} from './preferences.component';
import {SettingsService} from "../../../services/settings.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {LanguageCode, Preferences} from "../../../models/preferences";
import {of} from "rxjs";

describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<PreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SettingsService],
      declarations: [PreferencesComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Nazlıcan Eren
   */
  it('Page should load with the user\'s preferences', () => {
    // Arrange
    // Get UI elements
    const languagePicker: HTMLSelectElement = componentHtml.querySelector('#languagePicker');
    const colorblindnessInput: HTMLInputElement = componentHtml.querySelector('#colorblindness');
    const darkModeInput: HTMLInputElement = componentHtml.querySelector('#darkMode');
    const submitButton: HTMLButtonElement = componentHtml.querySelector('button[type=submit]');

    // Mock user preferences
    let mockPreferences = new Preferences(1, LanguageCode.en_GB, false, false);

    // Act
    // Create a spy and mock the response
    const settingsService = fixture.debugElement.injector.get(SettingsService);
    const webStorageService = fixture.debugElement.injector.get(WebStorageService);
    webStorageService.set('userId', '1');
    const spy = spyOn(settingsService, 'getPrefs').and.returnValue(of(mockPreferences));
    fixture.detectChanges();

    // Assert
    spy.calls.mostRecent().returnValue.subscribe(value => {
      expect(value).toEqual(mockPreferences);
      expect(component.language.value).toEqual(mockPreferences.languageCode);
      expect(component.colorblindness.value).toEqual(mockPreferences.colorblindness);
      expect(component.darkMode.value).toEqual(mockPreferences.darkMode);
    });
  });
});
