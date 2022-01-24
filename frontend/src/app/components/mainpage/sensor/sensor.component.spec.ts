import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SensorComponent} from './sensor.component';
import {NotificationsService, SimpleNotificationsModule} from "angular2-notifications";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SensorsService} from "../../../services/sensors.service";
import {HttpClientModule} from "@angular/common/http";

describe('SensorComponent', () => {
  let component: SensorComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<SensorComponent>;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
      providers: [NotificationsService, SensorsService],
      declarations: [SensorComponent],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        SimpleNotificationsModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
