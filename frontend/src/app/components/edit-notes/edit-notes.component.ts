import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotesService} from "../../services/notes.service";
import {Note} from "../../models/note";
import {WebStorageService} from "../../services/storage/web-storage.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Subscription} from "rxjs";
import {PostNote} from "../../models/postNote";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['../share-notes/share-notes.component.css']
})
export class EditNotesComponent implements OnInit, OnDestroy {
  private _selectedNoteFromNotes: Note;
  note: Note;
  user: User | null;
  noteForm: FormGroup;
  private userSubscription: Subscription;

  @Input()
  set selectedNoteFromNotes(note: Note) {
    this.note = note;
    this.title.patchValue(this.note.title);
    this.text.patchValue(this.note.noteText);
    this.noteForm.updateValueAndValidity();
  }

  get selectedNoteFromNotes(): Note {
    return this._selectedNoteFromNotes;
  }

  @Output() selectedNoteFromNotesChange = new EventEmitter<Note>();
  @Output() unselectedEvent = new EventEmitter();

  constructor(private notesService: NotesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private webStorageService: WebStorageService,
              private userService: UserService) {
    this.noteForm = new FormGroup({
      title: new FormControl(''),
      text: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.loggedUser$.subscribe(value => {
      this.user = value;
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  get title() {
    return this.noteForm.get('title');
  }

  get text() {
    return this.noteForm.get('text');
  }

  onReturnToNotes() {
    this.unselectedEvent.emit(true);
  }

  onSaveNote(title: string, text: string) {
    if (title.trim() === this.note.title && text.trim() === this.note.noteText) {
      this.unselectedEvent.emit(true);
      return;
    }
    let note = new Note(this.note.noteId, this.note.user, this.note.timestamp, title, text);
    let postNote = new PostNote(this.note.noteId, this.note.user.id, this.note.timestamp, title, text);
    this.notesService.addNote(note, postNote);
    this.unselectedEvent.emit(true);
  }
}

