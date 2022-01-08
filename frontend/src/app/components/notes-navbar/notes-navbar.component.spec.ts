import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesNavbarComponent } from './notes-navbar.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { routes } from "../../app-routing.module";
import { NotesComponent } from "../notes/notes.component";
import {NotesService} from "../../services/notes.service";
import {UserService} from "../../services/user.service";

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

  it('should create the notesNavbar component', () => {
    let fixture = TestBed.createComponent(NotesNavbarComponent);
    let component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should use the logged in user from the user service', () => {
    let fixture = TestBed.createComponent(NotesNavbarComponent);
    let component = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.loggedUser$).toEqual(component.user);
  });
  
});
