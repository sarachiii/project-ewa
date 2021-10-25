import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-share-notes',
  templateUrl: './share-notes.component.html',
  styleUrls: ['./share-notes.component.css']
})
export class ShareNotesComponent implements OnInit {

  @Output() unselectedEvent = new EventEmitter();
  teamNumber: String | undefined;
  username: String | undefined;
  text: String | undefined;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    //private http: HttpClient
    setInterval(() => {
      this.currentDate()
    }, 1000)
  }

  ngOnInit(): void {
  }

  onReturnToNotes() {
    if (confirm("Are you sure you want to discard unsaved changes?")) {
      this.unselectedEvent.emit(true);
    }
  }

  onSaveNote(postData: { date: string; teamNumber: string; text: String; username: String }) {
    // this.this.post('localhost:8080/note/add.json', postData)
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });
    console.log(postData);
    this.unselectedEvent.emit(true);
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
