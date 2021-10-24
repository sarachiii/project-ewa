import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {
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
