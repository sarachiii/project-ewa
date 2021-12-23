import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotesService} from "../../services/notes.service";
import {Note} from "../../models/note";
import {WebStorageService} from "../../services/storage/web-storage.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Subscription} from "rxjs";
import {PostNote} from "../../models/postNote";

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['../share-notes/share-notes.component.css']
})
export class EditNotesComponent implements OnInit {
  private _selectedNoteFromNotes: Note;
  title: string;
  text: string;
  note: Note;
  user: User | null;
  private userSubscription: Subscription;

  @Input()
  set selectedNoteFromNotes(note: Note) {
    this.note = note;
  }

  get selectedNoteFromNotes(): Note {
    return this._selectedNoteFromNotes;
  }
  @Output() selectedNoteFromNotesChange = new EventEmitter<Note>();

  @Output() unselectedEvent = new EventEmitter();


  constructor(private notesService: NotesService, private router: Router, private activatedRoute: ActivatedRoute,
              private webStorageService: WebStorageService, private userService: UserService) {
    setInterval(() => {
      this.currentDate()
    }, 1000)

  }

  ngOnInit(): void {
    this.userSubscription = this.userService.loggedUser$.subscribe(value => {
      this.user = value;
      console.log(this.user);
    })
  }

  onReturnToNotes(title: string, text: string) {
    if (title.trim() === this.note.title && text.trim() === this.note.noteText) this.unselectedEvent.emit(true);
    else if (confirm("Are you sure you want to discard unsaved changes?")) this.unselectedEvent.emit(true);
  }

  onSaveNote(title: string, text: string) {
    if (title.trim() === this.note.title && text.trim() === this.note.noteText){
      this.unselectedEvent.emit(true);
      return;
    }
    var note = new Note(this.note.noteId, this.note.user, this.note.timestamp, title, text);
    var postNote = new PostNote(this.note.noteId, this.note.user.id, this.note.timestamp, title, text);
    this.notesService.addNote(note, postNote);
    this.unselectedEvent.emit(true);
    window.location.reload();
  }

  currentDate() {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return new Date().getDate() + " " + months[new Date().getMonth()] + " " +
      new Date().getFullYear() + ", " + new Date().getHours() + ":" + new Date().getMinutes();
  }
}

