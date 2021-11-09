import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

/**
 * This is the notes service.
 *
 * @author Sarah Chrzanowska-Buth
 */

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private visitedPage: Subject<boolean> = new BehaviorSubject<boolean>(false);
  currentVisitedPage = this.visitedPage.asObservable();

  constructor() {
  }

  updateVisitedPage(visited: boolean) { //  This method sets the boolean for if the notes page was visited by the user or not
    this.visitedPage.next(visited);
  }

}
