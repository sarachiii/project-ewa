import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';
import { TeamService } from "../../../../services/team.service";
import { NotificationsService, SimpleNotificationsModule } from "angular2-notifications";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ TeamService, NotificationsService ],
      declarations: [ MembersComponent ],
      imports: [
        HttpClientTestingModule,
        SimpleNotificationsModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
