import { Component, OnInit } from '@angular/core';
import {Workfield} from "../../models/workfield";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-notes-navbar',
  templateUrl: './notes-navbar.component.html',
  styleUrls: ['./notes-navbar.component.css']
})
export class NotesNavbarComponent implements OnInit {

  selectedWorkfield: Workfield = <Workfield>{};
  private _workfields: Workfield[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this._workfields = [
      new Workfield("agronomy"),
      new Workfield("botany"),
      new Workfield("geology"),
      new Workfield("hydrology"),
      new Workfield("climate-science")
    ]
  }

  ngOnInit(): void {
    this.selectedWorkfield.name = this.activatedRoute.snapshot.params['field'];
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.selectedWorkfield.name = params['field'];
        }
      );

    this.activatedRoute
      .firstChild?.params
      .subscribe((params: Params) => {
        this.selectedWorkfield =
          this.workfields.find(workfield => workfield.name == params.field)
      });
  }

  onSelect(workfield: Workfield): void {
    if (workfield != null && workfield.name != this.selectedWorkfield?.name){
      this.router.navigate([workfield.name], {relativeTo: this.activatedRoute})
        .catch(reason => console.error(reason));
    }

    this.selectedWorkfield = workfield;
  }

  get workfields(): Workfield[] {
    return this._workfields;
  }
}
