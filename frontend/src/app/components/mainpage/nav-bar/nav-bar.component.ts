import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
import {NotesService} from "../../../services/notes.service";
/**
 * This is the navbar component.
 *
 * @author Hashim Mohammad and Sarah Chrzanowska-Buth
 */


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  user: User | null;
  private userSubscription: Subscription;
  visitedPage: boolean = false;

  constructor(private webStorageService: WebStorageService,
              private userService: UserService, private notesService: NotesService) {
    this.user = null;

  }

  ngOnInit(): void {
   	//give the visitedPage boolean the right value based on if the notes page was visited or not
    this.notesService.currentVisitedPage.subscribe(val => this.visitedPage = val);
    this.userSubscription = this.userService.loggedUser$.subscribe(value => {
      this.user = value;
      console.log(this.user);
    })
    if (this.isLoggedIn()) {
      // this.userService.getUserById(this.webStorageService.getUserId()).toPromise().then(value => {
      //   this.user = value;
      // }).catch(reason => { console.log(reason) })
      // Set logged in user in the UserService;
      this.userService.updateLoggedUser(this.webStorageService.getUserId())
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  isLoggedIn(): boolean {
    return this.webStorageService.has('userId');
  }

  logOut(): void {
    this.webStorageService.clear();
  }

  handleImageError(event: Event) {
    (<HTMLImageElement>event.target).src = "assets/images/default_avatar.svg";
  }

}
