import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorComponent } from './sensor.component';
import { NotificationsService, SimpleNotificationsModule } from "angular2-notifications";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('SensorComponent', () => {
  let component: SensorComponent;
  let fixture: ComponentFixture<SensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NotificationsService],
      declarations: [ SensorComponent ],
      imports: [
        HttpClientTestingModule,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
