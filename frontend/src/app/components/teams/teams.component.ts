import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {User, Role} from "../../models/user";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  user: User;
  readonly Role = Role;
  constructor(private userService: UserService) {
    this.userSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.loggedUser$.subscribe(value => {
      this.user = value;
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
