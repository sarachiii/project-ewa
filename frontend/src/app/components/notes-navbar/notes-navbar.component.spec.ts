import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesNavbarComponent } from './notes-navbar.component';
import {NotesService} from "../../services/notes.service";
import {UserService} from "../../services/user.service";

describe('NotesNavbarComponent', () => {
  let component: NotesNavbarComponent;
  let fixture: ComponentFixture<NotesNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesNavbarComponent ]
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

});
