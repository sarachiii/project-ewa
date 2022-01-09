import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareNotesComponent } from './share-notes.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../../app-routing.module";

describe('ShareNotesComponent', () => {
  let component: ShareNotesComponent;
  let fixture: ComponentFixture<ShareNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareNotesComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
