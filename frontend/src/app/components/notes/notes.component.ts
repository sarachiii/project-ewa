import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Workfield} from "../../models/workfield";
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";
import {NotesService} from "../../services/notes.service";
import {Note} from "../../models/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  createNote = false;
  notes: Note[];


  @Input() selectedWorkfieldFromNavbar: Workfield;

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  masonryOptions: NgxMasonryOptions;

  constructor(private notesService: NotesService) {
    this.masonryOptions = {
      percentPosition: true,
      horizontalOrder: true,
    };
  }

  ngOnInit() {
    this.notes = this.notesService.notes;
    console.log(this.notes);
  }

  // Update masonry after change
  reloadMasonry(): void {
    this.masonry?.reloadItems();
    this.masonry?.layout();
  }

  onCreateNote(createNote: boolean) {
    this.createNote = !createNote;
  }
}
