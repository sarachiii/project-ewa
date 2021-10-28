import {Component, OnInit, Input} from '@angular/core';
import {Workfield} from "../../models/workfield";

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
    createNote = false;

    @Input() selectedWorkfieldFromNavbar: Workfield;

    constructor() {
    }

    ngOnInit(): void {
    }

    onCreateNote(createNote: boolean) {
        this.createNote = !createNote;
    }
}
