import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";
import {ActivatedRoute, Router} from "@angular/router";
import {Note} from "../../models/note";
import {NotesService} from "../../services/notes.service";
import {first, map, skipWhile} from "rxjs/operators";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";

/**
 * This is the notes component. It takes care of showing the notes on the notes page.
 * It shows the newest notes first and than the older ones.
 *
 * @author Sarah Chrzanowska-Buth
 */

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnChanges {
  createNote: boolean = false;
  editNote: boolean = false;
  selectedNote: Note = <Note>{};
  test: boolean = false;
  user: User;
  notes$: Observable<Note[]>;

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
    this.userService.loggedUser$
      .pipe(skipWhile(value => Object.keys(value).length === 0), first())
      .subscribe(value => {
        this.user = value;
        // The initial notes page is equal to the specialty of the user
        this.router.navigate([this.user.specialty.toLowerCase()], {relativeTo: this.activatedRoute})
          .catch(reason => console.error(reason));
        this.selectedWorkfieldFromNavbar = this.user.specialty.toLowerCase();
      });

    this.notes$.subscribe(value => {
      if (value.length && this.masonry) this.reloadMasonry();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.masonryOptions = {
      percentPosition: true,
      horizontalOrder: true,
    };

      this.notes$ = this.notesService.notes$
        .pipe(map(notes => {
          return notes
            .filter((note) =>
              this.selectedWorkfieldFromNavbar == note.user.specialty.toLocaleLowerCase())
            .sort((a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf());
        }));
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
    this.notesService.deleteNote(noteId);
  }
}
