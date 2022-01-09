import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NotesComponent} from './notes.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../app-routing.module";
import {NotesService} from "../../services/notes.service";
import {UserService} from "../../services/user.service";
import {Observable, of} from "rxjs";
import {Role, User} from "../../models/user";
import {Note} from "../../models/note";
import {Specialty} from "../../models/specialty";
import {NgxMasonryModule} from "ngx-masonry";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

fdescribe('NotesComponent', () => {
  let component: NotesComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<NotesComponent>;
  let notesService: NotesService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesComponent],
      imports: [
        NgxMasonryModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(NotesComponent);
    await fixture.whenStable();
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    // notesService = fixture.debugElement.injector.get(NotesService);
    // userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  //
  // it('should display notes if user is logged in', () => {
  //   let fixture = TestBed.createComponent(NotesComponent);
  //   let component = fixture.debugElement.componentInstance;
  //   component.isLoggedIn = true;
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector("ngx-masonry"));
  // });

  it('should display the text "There are no notes yet! :(" if there are no notes', () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain("There are no notes yet! :(");
  });

  it('should display the ngx-masonry if there are notes',  waitForAsync(() => {
    let componentHTML = fixture.debugElement.nativeElement;
    let specialties = Object.values(Specialty);
    let users: User[] = [];
    let notes: Note[] = [];

    for (let i = 0; i < 10; i++) {
      users.push(new User(0, 0, Role.MEMBER, specialties[0], "Mark", "Smith"));
      notes.push(new Note(0, users[i], new Date(), "Testnote", "Test text"));
    }

    component.user = users[1];
    component.selectedSpecialtyFromNavbar = specialties[0];
    fixture.detectChanges();
    component.notes$ = of(notes);
    fixture.detectChanges();
    expect(componentHTML.querySelector('ngx-masonry')).toBeTruthy();
  }));

  // it('', () => {
  //   let userService = fixture.debugElement.injector.get(UserService);
  //   let mockUser = new User(0, 0, Role.MEMBER, "Agronomy", "Mark", "Smith");
  //   let specialty = mockUser.specialty;
  //
  //   let spy = spyOnProperty(userService, 'loggedUser$', "get").and.returnValue(of(mockUser));
  //   spy.calls.mostRecent().returnValue.subscribe(value => {
  //     expect(value).toEqual(mockUser);
  //   })
  // });
});
