import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NotesComponent} from './notes.component';
import {NotesService} from "../../services/notes.service";
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {Role, User} from "../../models/user";
import {Note} from "../../models/note";
import {Specialty} from "../../models/specialty";

fdescribe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [NotesComponent],
      providers: [UserService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    let notesService = fixture.debugElement.injector.get(NotesService);
    let userService = fixture.debugElement.injector.get(UserService);
    let specialties = Object.values(Specialty);
    let users = [];
    let notes = [];

    for (let i = 0; i < 10; i++) {
      users.push(new User(0, 0, Role.MEMBER, specialties[Math.round(Math.random() * specialties.length)], "Mark", "Smith"));
      new Note(0, users[i], new Date(), "Testnote", "Test text");
    }

    let spy = spyOnProperty(notesService, 'notes$', "get").and.returnValue(of(notes));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    let fixture = TestBed.createComponent(NotesComponent);
    let component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display notes if user is logged in', () => {
    let fixture = TestBed.createComponent(NotesComponent);
    let component = fixture.debugElement.componentInstance;
    component.isLoggedIn = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("ngx-masonry"));
  });

  it('should display the text "There are no notes yet! :(" if there are no notes', () => {
    let fixture = TestBed.createComponent(NotesComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain("There are no notes yet! :(");
  });

  it('shouldn\'t display the text "There are no notes yet! :(" if there are notes', () => {
    let fixture = TestBed.createComponent(NotesComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).not.toContain("There are no notes yet! :(");
  });

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
