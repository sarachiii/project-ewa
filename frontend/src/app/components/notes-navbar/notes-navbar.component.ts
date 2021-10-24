import { Component, OnInit } from '@angular/core';
import {Field} from "../../models/field";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-notes-navbar',
  templateUrl: './notes-navbar.component.html',
  styleUrls: ['./notes-navbar.component.css']
})
export class NotesNavbarComponent implements OnInit {

  selectedField: Field = <Field>{};
  private _scientistFields: Field[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this._scientistFields = [
      new Field("agronomy"),
      new Field("botany"),
      new Field("geology"),
      new Field("hydrology"),
      new Field("climate-science")
    ]
  }

  ngOnInit(): void {
    this.selectedField.name = this.activatedRoute.snapshot.params['name'];
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.selectedField.name = params['name'];
        }
      );
  }

  onSelect(field: Field): void {
    if (field != null && field.name != this.selectedField?.name){
      this.router.navigate([field.name], {relativeTo: this.activatedRoute})
        .catch(reason => console.error(reason));
    }

    this.selectedField = field;
  }

  get scientistFields(): Field[] {
    return this._scientistFields;
  }
}
