import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NotesNavbarComponent} from './notes-navbar.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {routes} from "../../app-routing.module";
import {NotesComponent} from "../notes/notes.component";
import {NotesService} from "../../services/notes.service";

describe('NotesNavbarComponent', () => {
  let component: NotesNavbarComponent;
  let fixture: ComponentFixture<NotesNavbarComponent>;
  let componentHtml: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NotesNavbarComponent,
        NotesComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [NotesService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesNavbarComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the notesNavbar component', () => {
    let fixture = TestBed.createComponent(NotesNavbarComponent);
    let component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should go to Botany nav-item if clicked on it', () => {
    let fixture = TestBed.createComponent(NotesNavbarComponent);
    let component = fixture.debugElement.componentInstance;
    const navitem: HTMLInputElement = componentHtml.querySelector('#navlink');
    navitem.textContent = 'Botany';
    navitem.dispatchEvent(new Event('click'));
    // TODO add expectation
  });
});
