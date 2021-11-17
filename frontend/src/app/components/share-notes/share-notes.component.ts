import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NotesService} from "../../services/notes.service";
import {Note} from "../../models/note";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-share-notes',
  templateUrl: './share-notes.component.html',
  styleUrls: ['./share-notes.component.css']
})
export class ShareNotesComponent implements OnInit {

  @Output() unselectedEvent = new EventEmitter();
  title: string | undefined;
  text: string | undefined;
  note: Note;


  constructor(private notesService: NotesService, private router: Router, private activatedRoute: ActivatedRoute) {
    setInterval(() => {
      this.currentDate()
    }, 1000)
  }

  ngOnInit(): void {
  }

  onReturnToNotes(title: string, text: string) {
    if (title.trim() === "" && text.trim() === "") this.unselectedEvent.emit(true);
    else if (confirm("Are you sure you want to discard unsaved changes?")) this.unselectedEvent.emit(true);
  }

  onSaveNote(title: string, text: string) {
    var date = new Date();
    date.setHours(date.getHours() + 1);
    var isodate = date.toISOString().replace(/\..+/, '');
    // userId & workfield are still hard coded.
    // noteId gets an id assigned in the database.
    this.notesService.addNote(new Note(0, 1, "B", isodate, title, text))
    this.unselectedEvent.emit(true);
  }

  onDisable() {
    return true;
  }

  currentDate() {
    let dateFormat = new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric'
    });
    return dateFormat;
  }
}
