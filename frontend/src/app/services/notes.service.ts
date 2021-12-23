import {Injectable, Output} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

/**
 * This is the notes service.
 *
 * @author Sarah Chrzanowska-Buth & Nazlıcan Eren
 */
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Note} from "../models/note";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {DatePipe} from "@angular/common";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private visitedPage: Subject<boolean> = new BehaviorSubject<boolean>(false);
  currentVisitedPage = this.visitedPage.asObservable();
  public notes: Note[] = [];
  resourceUrl: string = "";
  private _note$: BehaviorSubject<Note>;

  constructor(private http: HttpClient) {
    this.resourceUrl = environment.apiUrl + "/notes";
    this._note$ = new BehaviorSubject<Note>(<Note>{});
    this.allNotes();
  }

  get note$(): Observable<Note> {
    return this._note$.asObservable();
  }

  restGetNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.resourceUrl + "/all").pipe(catchError(this.handleError));
  }

  allNotes(): void{
    this.restGetNotes().subscribe((notes: Note[]) => {
      console.log(notes)
      let notesArray = notes.map(note => Note.copyConstructor(note));
      for (let i = 0; i < notes.length; i++) {
        this.notes.push(notesArray[i]);
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
    this.restPostNote(note).toPromise().then(() => {
      this.notes.push(Note.copyConstructor(note));
      console.log(this.notes)
    });
  }

  restPostNote(note): Observable<Note> {
    return this.http.post<Note>(this.resourceUrl + "/add", note);
  }

  deleteNote(noteId): void {
    this.http.delete<Note>(`${this.resourceUrl}/delete/${noteId}`).subscribe();
  }


  updateVisitedPage(visited: boolean) { //  This method sets the boolean for if the notes page was visited by the user or not
    this.visitedPage.next(visited);
  }
}
