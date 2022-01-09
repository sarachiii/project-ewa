import {Component, OnInit} from '@angular/core';
import {Workfield} from "../../models/workfield";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NotesService} from "../../services/notes.service";

/**
 * This is the notes navbar component that contains navbar items for different workfields,
 * so you can view the notes for your own workfield
 *
 * @author Sarah Chrzanowska-Buth
 */

@Component({
  selector: 'app-notes-navbar',
  templateUrl: './notes-navbar.component.html',
  styleUrls: ['./notes-navbar.component.css'],
  providers: [NotesService]
})
export class NotesNavbarComponent implements OnInit {

  selectedWorkfield: Workfield = <Workfield>{};
  private _workfields: Workfield[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this._workfields = Object.values(Workfield);
  }

  ngOnInit(): void {
    this.selectedWorkfield = this.activatedRoute.snapshot.params['field'];
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.selectedWorkfield = params['field'];
        }
      );

    this.activatedRoute
      .firstChild?.params
      .subscribe((params: Params) => {
        this.selectedWorkfield =
          this.workfields.find(workfield => workfield == params.field)
      });
  }

  onSelect(workfield: Workfield): void {
    if (workfield != null && workfield != this.selectedWorkfield){
      this.router.navigate([workfield], {relativeTo: this.activatedRoute})
        .catch(reason => console.error(reason));
    }

    this.selectedWorkfield = workfield;
  }

  get workfields(): Workfield[] {
    return this._workfields;
  }
}
