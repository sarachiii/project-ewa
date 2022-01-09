import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotesComponent } from './edit-notes.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../../app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

describe('EditNotesComponent', () => {
  let component: EditNotesComponent;
  let fixture: ComponentFixture<EditNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNotesComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
