import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Note} from "../models/note";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public notes: Note[] = [];
  resourceUrl: string = "";

  constructor(private http: HttpClient) {
    this.resourceUrl = environment.BACKEND_URL + "/notes"
    // Change allNotes() to botanyNotes() to see difference.
    this.allNotes();
    // this.botanyNotes();
  }

  restGetNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.resourceUrl + "/all").pipe(catchError(this.handleError));
  }

  allNotes(): void {
    this.restGetNotes().subscribe((notes: Note[]) => {
      let notesArray = notes.map(note => Note.copyConstructor(note));
      for (let i = 0; i < notes.length; i++) {
        this.notes.push(notesArray[i]);
      }
    });
  }

  botanyNotes(): void {
    this.restGetNotes().subscribe((notes: Note[]) => {
      let notesArray = notes.map(note => Note.copyConstructor(note));
      for (let i = 0; i < notes.length; i++) {
        if (notesArray[i].workfield == 'B') this.notes.push(notesArray[i]);
      }
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

  addNote(note: Note) {
    this.restPostNote(note).toPromise().then(scooter => {
      this.notes.push(scooter);
    });
  }

  restPostNote(note): Observable<Note> {
    return this.http.post<Note>(this.resourceUrl + "/add", note);
  }
}
