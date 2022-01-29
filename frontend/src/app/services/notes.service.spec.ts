import {TestBed} from '@angular/core/testing';

import {NotesService} from './notes.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Specialty} from "../models/specialty";
import {Role, User} from "../models/user";
import {environment} from "../../environments/environment";
import {Note} from "../models/note";

describe('NotesService', () => {
  let service: NotesService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotesService]
    });
    service = TestBed.inject(NotesService)
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all notes available', (done) => {

    // Arrange: mock notes
    const resourceUrl = environment.apiUrl;
    let notes: Note[] = []; //create the notes array
    let mockUser = new User(0, 0, Role.MEMBER, Specialty.GEOLOGY, "Mark", "Smith"); //mock a user
    let note1 = new Note(0, mockUser, new Date(), "Testnote", "Test text");
    let note2 = new Note(1, mockUser, new Date(), "Testnote", "Test text");
    notes.push(note1, note2);  //add notes to the array

    // Act: Call method from the service
    service.notes$.subscribe((res) => {
      // Assert: Confirm response is true
      expect(res).toBeTruthy();
      expect(res).toBeInstanceOf(Array);
      if(res.length){
        expect(res).toEqual(notes);
      }
      done();
    });

    // Assert: URL
    const req = httpMock.expectOne(`${resourceUrl}/notes/all`);
    expect(req.request.method).toBe('GET');
    expect(service).toBeTruthy();

    // Act: Send response
    req.flush(notes);
  });
});
