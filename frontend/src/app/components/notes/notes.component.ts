import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Workfield} from "../../models/workfield";
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";
import {ActivatedRoute, Router} from "@angular/router";
import {Note} from "../../models/note";
import {NotesService} from "../../services/notes.service";
import {first, skipWhile} from "rxjs/operators";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {interval} from "rxjs";

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
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  test: boolean = false;
  user: User;

  get sortedNotes(): Note[] {
    // this.filteredNotes = this.notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.workfield.toLocaleLowerCase().charAt(0)); //the notes are filtered by workfield and are shown on the correct page
    // TODO: Maybe placing the filter here is exhausting too many resources
    this.notes = this.notesService.notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.workfield.toLocaleLowerCase().charAt(0)); //the notes are filtered by workfield and are shown on the correct page
    // if (this.masonry) this.reloadMasonry();
    // console.log(this.notes)
    return this.notes.sort((a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf());
  }

  @Input() selectedWorkfieldFromNavbar: Workfield;

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
    //TODO: set the workfield to the workfield of the logged in user
    this.router.navigate(["botany"], {relativeTo: this.activatedRoute}) //the initial notes page is equal to the workfield of the user
      .catch(reason => console.error(reason));
    this.isVisited = true;
    this.notesService.updateVisitedPage(this.isVisited);
    this.selectedWorkfieldFromNavbar = Workfield.BOTANY; //TODO: set the workfield to the workfield of the logged in user
    this.notesService.restGetNotes().toPromise().then(value => {
      this.notesService.notes = value.map(note => Note.copyConstructor(note));
      // this.notes = this.notesService.notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.workfield.toLocaleLowerCase().charAt(0)); //the notes are filtered by workfield and are shown on the correct page
      // this.notes = this.notesService.notes;
      // this.filteredNotes = this.notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.workfield.toLocaleLowerCase().charAt(0)); //the notes are filtered by workfield and are shown on the correct page
    }).catch(console.log);
    // this.notesService.notes$.subscribe(value => {
    //   console.log(value)
    //   if (this.masonry) this.reloadMasonry();
    // })
    // this.filteredNotes = this.notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.workfield.toLocaleLowerCase().charAt(0)); //the notes are filtered by workfield and are shown on the correct page
    // console.log(this.filteredNotes)
    this.userService.loggedUser$.pipe(skipWhile(value => Object.keys(value).length === 0), first()).subscribe(value => {
      this.user = value;
    });
  }

  ngOnChanges(): void {
    this.masonryOptions = {
      percentPosition: true,
      horizontalOrder: true,
    };
    // this.filteredNotes = this.notes.filter(note => this.selectedWorkfieldFromNavbar.charAt(0) == note.workfield.toLocaleLowerCase().charAt(0));
  }

  reloadMasonry(): void {
    this.masonry.reloadItems();
    this.masonry.layout();
  }

  onCreateNote(createNote: boolean) {
    this.createNote = !createNote;
  }
}
