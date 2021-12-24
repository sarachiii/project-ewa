import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Workfield} from "../../models/workfield";
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";
import {ActivatedRoute, Router} from "@angular/router";
import {Note} from "../../models/note";
import {NotesService} from "../../services/notes.service";
import {first, map, skipWhile} from "rxjs/operators";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {interval, Observable} from "rxjs";

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
export class NotesComponent implements OnInit, OnChanges {
  isVisited: boolean = false;
  createNote: boolean = false;
  editNote: boolean = false;
  deleteNote: boolean;
  selectedNote: Note = <Note>{};
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  test: boolean = false;
  user: User;
  notes$: Observable<Note[]>;

  get sortedNotes(): Note[] {
    // this.filteredNotes = this.notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.workfield.toLocaleLowerCase().charAt(0)); //the notes are filtered by workfield and are shown on the correct page
    // TODO: Maybe placing the filter here is exhausting too many resources
    this.notes = this.notesService.notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.user.specialty.toLocaleLowerCase().charAt(0)); //the notes are filtered by workfield and are shown on the correct page
    // if (this.masonry) this.reloadMasonry();
    // console.log(this.notes)
    return this.notes.sort((a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf());
  }

  @Input() selectedWorkfieldFromNavbar: string;

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  masonryOptions: NgxMasonryOptions;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private notesService: NotesService,
              private userService: UserService) {
    this.masonryOptions = {
      percentPosition: true,
      horizontalOrder: true,
    };
  }

  ngOnInit(): void {
    this.isVisited = true;
    this.notesService.updateVisitedPage(this.isVisited);
    /*this.notesService.restGetNotes().toPromise().then(value => {
      this.notesService.notes = value.map(note => Note.copyConstructor(note));
    }).catch(console.log);*/
    /*this.notes$ = this.notesService.notes$
      .pipe(map(notes => notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.user.specialty.toLocaleLowerCase().charAt(0))));
    // this.notes$.subscribe(x=>console.log(x))*/

    this.userService.loggedUser$.pipe(skipWhile(value => Object.keys(value).length === 0), first()).subscribe(value => {
      this.user = value;
      this.router.navigate([this.user.specialty.toLowerCase()], {relativeTo: this.activatedRoute}) //the initial notes page is equal to the workfield of the user
        .catch(reason => console.error(reason));
      this.selectedWorkfieldFromNavbar = this.user.specialty.toLowerCase(); //TODO: set the workfield to the workfield of the logged in user
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.masonryOptions = {
      percentPosition: true,
      horizontalOrder: true,
    };

    this.notes$ = this.notesService.notes$
      .pipe(map(notes => {
        return notes
          .filter((note) => this.selectedWorkfieldFromNavbar.charAt(0) == note.user.specialty.toLocaleLowerCase().charAt(0))
          .sort((a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf());
      }));

    this.notes$.subscribe(value => console.log(value))
    console.log(changes)
    console.log("this is run")
  }

  reloadMasonry(): void {
    this.masonry.reloadItems();
    this.masonry.layout();
  }

  onCreateNote(createNote: boolean) {
    this.createNote = !createNote;
  }

  onEditNote(editNote: boolean, note) {
    this.selectedNote = note
    this.editNote = !editNote;
  }

  onDeleteNote(noteId: number) {
    if (confirm("Are you sure you want to delete this note?")) {
      this.notesService.deleteNote(noteId);
      window.location.reload();
    }
  }
}
