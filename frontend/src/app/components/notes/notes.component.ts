import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Workfield} from "../../models/workfield";
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";
import {ActivatedRoute, Router} from "@angular/router";
import {Note} from "../../models/note";
import {User} from "../../models/user";
import {NotesService} from "../../services/notes.service";

/**
 * This is the notes component. It takes care of showing the notes on the notes page. It shows the newest notes first and than the older ones.
 *
 * @author Sarah Chrzanowska-Buth
 */

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  isVisited: boolean = false;
  createNote: boolean = false;
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  loggedInUser: User;
  userID: number = 1000;
  noteId: number = 1;

  public get sortedNotes(): Note[] {
    return this.filteredNotes.sort((a, b) => new Date(b.timestamp).getDate() - new Date(a.timestamp).getDate());
  }

  @Input() selectedWorkfieldFromNavbar: Workfield;

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  masonryOptions: NgxMasonryOptions;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private notesService: NotesService) {
    this.masonryOptions = {
      percentPosition: true,
      horizontalOrder: true,
    };
    this.loggedInUser = User.generateLoggedInUser(this.userID); //generates a random logged in user
    this.notes.push(Note.generateNoteOfLoggedInUser(this.noteId++, this.userID++)); //make a note for the logged in user
    for (let i = 0; i < 10; i++) {
      this.notes.push(Note.generateNote(this.noteId++, this.userID++)); //generate 10 random notes with random users
    }
  }

  ngOnInit(): void {
    this.router.navigate([this.loggedInUser.workfield], {relativeTo: this.activatedRoute}) //the initial notes page is equal to the workfield of the user
      .catch(reason => console.error(reason));
    this.isVisited = true;
    this.notesService.updateVisitedPage(this.isVisited);
    this.selectedWorkfieldFromNavbar = this.loggedInUser.workfield;
    this.filteredNotes = this.notes.filter(note => this.selectedWorkfieldFromNavbar == note.user.workfield); //the notes are filtered by workfield and are shown on the correct page
  }

  ngOnChanges(): void {
    this.masonryOptions = {
      percentPosition: true,
      horizontalOrder: true,
    };
    this.filteredNotes = this.notes.filter(note => this.selectedWorkfieldFromNavbar == note.user.workfield);
    // this.masonry?.reloadItems(); //reload masonry items after change
    // this.masonry?.layout();
  }

  onCreateNote(createNote: boolean) {
    this.createNote = !createNote;
  }
}
