import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesComponent } from './preferences.component';
import { SettingsService } from "../../../services/settings.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";

describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SettingsService],
      declarations: [ PreferencesComponent ],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
