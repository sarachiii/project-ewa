import {Component, OnInit} from '@angular/core';
import {NotesService} from "../../../services/notes.service";
import {AuthenticationService} from "../../../services/authentication.service";

/**
 * This is the navbar component.
 *
 * @author Hashim Mohammad and Sarah Chrzanowska-Buth
 */

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  visitedPage: boolean = false;

  constructor(private notesService: NotesService, public loginService:AuthenticationService) {
  }

  ngOnInit(): void {
    this.notesService.currentVisitedPage.subscribe(val => this.visitedPage = val); //give the visitedPage boolean the right value based on if the notes page was visited or not, the service keeps track of that
  }

}
