import {Component, OnInit, Input} from '@angular/core';
import {Workfield} from "../../models/workfield";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() selectedWorkfieldFromNavbar : Workfield;

  createNote = false;
  mobile: boolean | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (window.innerWidth < 992) {
      this.mobile = true;
    } else if (window.innerWidth > 992){
      this.mobile = false;
    }
  }

  onCreateNote(createNote: boolean) {
    this.createNote = !createNote;
  }
}
