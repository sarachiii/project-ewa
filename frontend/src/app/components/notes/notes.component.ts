import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Workfield} from "../../models/workfield";
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
    createNote = false;

    @Input() selectedWorkfieldFromNavbar: Workfield;

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  masonryOptions: NgxMasonryOptions;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.masonryOptions = {
      percentPosition: true,
      horizontalOrder: true,
    };
  }

    ngOnInit(): void {
      this.router.navigate(['botany'], {relativeTo: this.activatedRoute})
        .catch(reason => console.error(reason));
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
