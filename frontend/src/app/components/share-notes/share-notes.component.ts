import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotesService} from "../../services/notes.service";
import {Note} from "../../models/note";
import {WebStorageService} from "../../services/storage/web-storage.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-share-notes',
  templateUrl: './share-notes.component.html',
  styleUrls: ['./share-notes.component.css']
})
export class ShareNotesComponent implements OnInit {

  @Output() unselectedEvent = new EventEmitter();
  title: string;
  text: string;
  note: Note;
  user: User | null;
  private userSubscription: Subscription;

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
    if (title.trim() === "" && text.trim() === "") this.unselectedEvent.emit(true);
    else if (confirm("Are you sure you want to discard unsaved changes?")) this.unselectedEvent.emit(true);
  }

  onSaveNote(title: string, text: string) {
    var date = new Date();
    date.setHours(date.getHours() + 1);
    var isodate = date.toISOString().replace(/\..+/, '');
    // this.notesService.addNote(new Note(0, this.user.id, "B",
      this.notesService.addNote(new Note(0, this.user.id, this.user.specialty.charAt(0),
      isodate, title, text, this.user.firstName))
    this.unselectedEvent.emit(true);
    window.location.reload();
  }

  currentDate() {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return new Date().getDay() + " " + months[new Date().getMonth()] + " " +
      new Date().getFullYear() + ", " + new Date().getHours() + ":" + new Date().getMinutes();
  }
}
