import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesNavbarComponent } from './notes-navbar.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { routes } from "../../app-routing.module";
import { NotesComponent } from "../notes/notes.component";

describe('NotesNavbarComponent', () => {
  let component: NotesNavbarComponent;
  let fixture: ComponentFixture<NotesNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NotesNavbarComponent,
        NotesComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
