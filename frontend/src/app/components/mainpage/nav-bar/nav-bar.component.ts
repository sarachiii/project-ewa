import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {UserService} from "../../../services/user.service";
import {Role, User} from "../../../models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  user: User | null;
  private userSubscription: Subscription;

  constructor(private webStorageService: WebStorageService,
              private userService: UserService) {
    this.user = null;

  }

  ngOnInit(): void {
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

}
