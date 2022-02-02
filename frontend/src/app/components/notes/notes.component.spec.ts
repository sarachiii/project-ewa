import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NotesComponent} from './notes.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../app-routing.module";
import {NotesService} from "../../services/notes.service";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {Role, User} from "../../models/user";
import {Note} from "../../models/note";
import {Specialty} from "../../models/specialty";
import {NgxMasonryModule} from "ngx-masonry";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('NotesComponent', () => {
  let component: NotesComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<NotesComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesComponent],
      imports: [
        NgxMasonryModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [NotesService]
    })
      .compileComponents();
    fixture = TestBed.createComponent(NotesComponent);
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    userService = fixture.debugElement.injector.get(UserService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the text "There are no notes yet! :(" if there are no notes', () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain("There are no notes yet! :(");
  });

  it('should display the ngx-masonry if there are notes', waitForAsync(() => {

    // Act: run change-detection
    fixture.detectChanges();

    // Arrange: mock the user and notes
    let componentHTML = fixture.debugElement.nativeElement;
    let notes: Note[] = []; //create the notes array
    let mockUser = new User(0, 0, Role.MEMBER, Specialty.GEOLOGY, "Mark", "Smith"); //mock a user

    notes.push(new Note(0, mockUser, new Date(), "Testnote", "Test text")); //add a note to the array
    component.user = mockUser; //set the mocked user as the logged in user

    // Act: assign the notes
    component.notes$ = of(notes);
    fixture.detectChanges();

    // Assert: check if the ngx-masonry is visible
    expect(componentHTML.querySelector('ngx-masonry')).toBeTruthy();
  }));

  it('the initial selected nav-item is the same as the user\'s specialty', () => {

    // Arrange: mock the user and it's specialty
    let mockUser = new User(0, 0, Role.MEMBER, "Agronomy", "Mark", "Smith");
    let specialty = mockUser.specialty.toLocaleLowerCase();
    let spy = spyOnProperty(userService, 'loggedUser$', "get").and.returnValue(of(mockUser));
    fixture.detectChanges();

    // Act
    spy.calls.mostRecent().returnValue.subscribe(value => {
      expect(value).toEqual(mockUser);
    })
    fixture.detectChanges();

    // Assert: check if the selected specialty in the navbar matches the user's specialty
    expect(component.selectedSpecialtyFromNavbar).toEqual(specialty);
  });
});
