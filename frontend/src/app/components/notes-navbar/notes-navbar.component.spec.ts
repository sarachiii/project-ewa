import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NotesNavbarComponent} from './notes-navbar.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {routes} from "../../app-routing.module";
import {NotesComponent} from "../notes/notes.component";
import {NotesService} from "../../services/notes.service";
import {Router} from "@angular/router";

describe('NotesNavbarComponent', () => {
  let component: NotesNavbarComponent;
  let fixture: ComponentFixture<NotesNavbarComponent>;
  let componentHtml: HTMLElement;
  let router: Router;

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
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NotesNavbarComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
  });

  it('should create the notesNavbar component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create the notesNavbar with the nav-link in uppercase', () => {

    // Arrange: mock the specialty
    component.specialties = ["Botany"];

    // Act
    fixture.detectChanges();

    // Arrange: get UI component
    const navlink: HTMLAnchorElement = componentHtml.querySelector('#navlink');

    // Assert: check if nav-link shows the correct text
    expect(navlink.innerText).toEqual("BOTANY");
    expect(component).toBeTruthy();
  });

  it('navigates to /botany when the botany nav-item is clicked', () => {

    // Arrange: mock the specialty
    component.specialties = ["Botany"];

    // Act
    fixture.detectChanges();

    // Arrange: get UI component
    const navSpy = spyOn(router, 'navigate');
    const navitem: HTMLAnchorElement = componentHtml.querySelector('#navitem');

    // Act: click on the nav-item
    navitem.click();
    fixture.detectChanges();

    //Assert: check if the path is correct
    expect(navSpy).toHaveBeenCalledWith(
      ['botany'],jasmine.anything()
    );
  });
});
