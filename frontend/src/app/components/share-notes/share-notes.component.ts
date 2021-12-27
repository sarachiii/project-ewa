import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotesService} from "../../services/notes.service";
import {Note} from "../../models/note";
import {WebStorageService} from "../../services/storage/web-storage.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {interval, Subscription, TimeInterval} from "rxjs";
import {PostNote} from "../../models/postNote";

@Component({
  selector: 'app-share-notes',
  templateUrl: './share-notes.component.html',
  styleUrls: ['./share-notes.component.css']
})
export class ShareNotesComponent implements OnInit, OnDestroy {

  @Output() unselectedEvent = new EventEmitter();
  title: string;
  text: string;
  note: Note;
  user: User | null;
  private userSubscription: Subscription;
  interval: number

  constructor(private notesService: NotesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private webStorageService: WebStorageService,
              private userService: UserService) {
    this.interval = setInterval(() => {
      this.currentDate()
    }, 1000)
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.loggedUser$.subscribe(value => {
      this.user = value;
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

  onReturnToNotes(title: string, text: string) {
    if (title.trim() === "" && text.trim() === "") this.unselectedEvent.emit(true);
    else if (confirm("Are you sure you want to discard unsaved changes?")) this.unselectedEvent.emit(true);
  }

  onSaveNote(title: string, text: string) {
    let note = new Note(0, this.user, new Date(), title, text);
    let postNote = new PostNote(0, this.user.id, new Date(), title, text);
    this.notesService.addNote(note, postNote);
    this.unselectedEvent.emit(true);
  }

  currentDate() {
    let options: Intl.DateTimeFormatOptions = {
      day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'
    }
    return new Date().toLocaleString('en-GB', options);
  }
}
