import {Component, OnInit, Input} from '@angular/core';
import {Field} from "../../models/field";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() selectedFieldFromNavbar : Field;

  ngOnInit(): void {
  }
}
