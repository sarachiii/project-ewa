import {Component, OnInit, Input} from '@angular/core';
import {Field} from "../../models/field";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() selectedFieldFromNavbar : Field;

  createNote = false;
  mobile: boolean | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (window.innerWidth < 992) { // 768px portrait
      this.mobile = true;
    } else if (window.innerWidth > 992){
      this.mobile = false;
    }
    // var width = window.innerWidth;
    // this.mobile = width < 992;

  }

  onCreateNote(createNote: boolean) {
    this.createNote = !createNote;
  }
}
