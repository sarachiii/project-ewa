import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Workfield} from "../../models/workfield";
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";
import {ActivatedRoute, Router} from "@angular/router";
import {Note} from "../../models/note";
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
  }

  ngOnInit(): void {
    //TODO: set the workfield to the workfield of the logged in user
    this.router.navigate(["botany"], {relativeTo: this.activatedRoute}) //the initial notes page is equal to the workfield of the user
      .catch(reason => console.error(reason));
    this.isVisited = true;
    this.notesService.updateVisitedPage(this.isVisited);
    this.selectedWorkfieldFromNavbar = Workfield.BOTANY; //TODO: set the workfield to the workfield of the logged in user
    this.notes = this.notesService.notes;
    this.filteredNotes = this.notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.workfield.toLocaleLowerCase().charAt(0)); //the notes are filtered by workfield and are shown on the correct page
  }

  ngOnChanges(): void {
    this.masonryOptions = {
      percentPosition: true,
      horizontalOrder: true,
    };
    this.filteredNotes = this.notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.workfield.toLocaleLowerCase().charAt(0));
  }

  onCreateNote(createNote: boolean) {
    this.createNote = !createNote;
  }
}
