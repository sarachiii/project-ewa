import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditNotesComponent} from './edit-notes.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NotesService} from "../../services/notes.service";
import {Role, User} from "../../models/user";
import {Note} from "../../models/note";

describe('EditNotesComponent', () => {
  let component: EditNotesComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<EditNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditNotesComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule
      ],
      providers: [NotesService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotesComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

  /**
   * @author Nazlıcan Eren
   */
  it('The edit note page should contain title and text of the note', () => {
    // Arrange
    // Mock the user
    let mockUser = new User(123, 1, Role.MEMBER, "Agronomy", "Ian", "Bradford");
    // Mock the note
    let mockNote = new Note(12345, mockUser, new Date(), "Note title...", "Note text...");

    // Act
    component.selectedNoteFromNotes = mockNote;
    fixture.detectChanges(); // Angular should be updated

    // Arrange (getting UI components)
    const titleInput: HTMLInputElement = componentHtml.querySelector('#title');
    const textInput: HTMLInputElement = componentHtml.querySelector('#note');

    // Assert
    expect(titleInput.value).toEqual("Note title...");
    expect(textInput.value).toEqual("Note text...");
  });
});
