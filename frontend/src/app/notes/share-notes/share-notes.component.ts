import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ViewNotesComponent} from "../view-notes/view-notes.component";

@Component({
  selector: 'app-share-notes',
  templateUrl: './share-notes.component.html',
  styleUrls: ['./share-notes.component.css']
})
export class ShareNotesComponent implements OnInit {

  @Output() unselectedEvent = new EventEmitter();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    setInterval(() => {
      this.currentDate()
    }, 1000)
  }

  ngOnInit(): void {
  }

  onSaveNote() {
    this.unselectedEvent.emit(true);

    //save
    // this.routeTo();
  }

  onDisable() {
    return true;
  }

  currentDate() {
    let dateFormat = new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric'
    });
    return dateFormat;
  }

  // routeTo(): void {
  //   console.log("testttt")
  //   this.router.navigate(['../../notes/view-notes'], {relativeTo: this.activatedRoute.parent})
  //     .catch(reason => console.error(reason));
  // }
}
