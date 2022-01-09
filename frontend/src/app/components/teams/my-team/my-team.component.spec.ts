import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamComponent } from './my-team.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('MyTeamComponent', () => {
  let component: MyTeamComponent;
  let fixture: ComponentFixture<MyTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
