import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShareNotesComponent} from './share-notes.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../app-routing.module";
import {NotesService} from "../../services/notes.service";
import {FormsModule} from "@angular/forms";

describe('ShareNotesComponent', () => {
  let component: ShareNotesComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<ShareNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareNotesComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule
      ],
      providers: [NotesService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareNotesComponent);
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
  it('Writing the title and text of a note should be successfull when ' +
    'staying within the maximum number of characters', () => {
    // Arrange (getting UI components)
    const titleInput: HTMLInputElement = componentHtml.querySelector('#title');
    const noteTextInput: HTMLInputElement = componentHtml.querySelector('#note');

    // Act: Creating a note
    titleInput.value = '-Title of this note is exactly 50 characters long-';
    titleInput.dispatchEvent(new Event('input'));

    noteTextInput.value = 'Text of the note...';
    noteTextInput.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // Angular should be updated

    // Assert: Check if the title and text are correct.
    // Checks if the maximum number of characters stay the same
    expect(titleInput.maxLength).toBe(50);
    expect(noteTextInput.maxLength).toBe(500);

    // Checks if the property was updated
    expect(component.title).toEqual(titleInput.value);
    expect(component.text).toEqual(noteTextInput.value);

    // Checks if the values are less than or equals the maximum number of characters
    expect(component.title.length).toBeLessThanOrEqual(50);
    expect(component.text.length).toBeLessThanOrEqual(500);
  });
});
