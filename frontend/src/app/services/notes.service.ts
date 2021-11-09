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

  updateVisitedPage(visited: boolean) {
    this.visitedPage.next(visited);
  }

}
