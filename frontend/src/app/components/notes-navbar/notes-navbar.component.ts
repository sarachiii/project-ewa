import { Component, OnInit } from '@angular/core';
import {Field} from "../../models/field";

@Component({
  selector: 'app-notes-navbar',
  templateUrl: './notes-navbar.component.html',
  styleUrls: ['./notes-navbar.component.css']
})
export class NotesNavbarComponent implements OnInit {

  scientistFields: Field[];
  selectedField: Field = <Field>{};

  constructor() {
    this.scientistFields = [
      new Field("agronomy"),
      new Field("botany"),
      new Field("geology"),
      new Field("hydrology"),
      new Field("climate-science")
    ]
  }

  ngOnInit(): void {
  }

  onSelect(field: Field): void {
    if(field.name === this.selectedField.name){
      this.selectedField = <Field>{};
    } else {
      this.selectedField = field;
    }
  }
}
