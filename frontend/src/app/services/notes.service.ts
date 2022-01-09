import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Note} from "../models/note";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {PostNote} from "../models/postNote";
import {WebStorageService} from "./storage/web-storage.service";

/**
 * This is the notes service.
 *
 * @author Sarah Chrzanowska-Buth & Nazlıcan Eren
 */

@Injectable()
export class NotesService {
  resourceUrl: string;
  private _notes$: BehaviorSubject<Note[]>;

  constructor(private http: HttpClient,
              protected webStorage:WebStorageService) {
    this.resourceUrl = environment.apiUrl + "/notes";
    this._notes$ = new BehaviorSubject<Note[]>([]);
    this.allNotes();
  }

  get notes$(): Observable<Note[]> {
    return this._notes$.asObservable();
  }

  restGetNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.resourceUrl + "/all").pipe(catchError(this.handleError));
  }

  allNotes(): void {
    this.restGetNotes().subscribe((notes: Note[]) => {
      this._notes$.next(notes.map(note => Note.copyConstructor(note)));
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  addNote(note: Note, postNote: PostNote) {
    this.restPostNote(postNote).toPromise().then((savedNote) => {
      let notes = this._notes$.getValue();
      //search if the note already exists by index
      let noteIndex = notes.findIndex(n => n.noteId == savedNote.noteId);
      //if note does exist, update the note in the list
      if (noteIndex > -1) {
        notes[noteIndex] = note;
      } else {
        //if note doesn't exist, add the new note to the list
        savedNote.user = note.user;
        notes.push(Note.copyConstructor(savedNote));
      }
      this._notes$.next(notes);
    });
  }

  restPostNote(note): Observable<Note> {
    return this.http.post<Note>(this.resourceUrl, note);
  }

  deleteNote(noteId): void {
    this.http.delete<Note>(`${this.resourceUrl}/${noteId}`).subscribe(() => {
      let notes = this._notes$.getValue();
      let noteIndex = notes.findIndex(n => n.noteId == noteId);
      if (noteIndex > -1) notes.splice(noteIndex, 1);
      this._notes$.next(notes);
    }, error => console.log(error));
  }
}
