import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamService} from "../../../services/team.service";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {skipWhile} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css'],
  providers: [TeamService]
})
export class MyTeamComponent implements OnInit, OnDestroy {
  user: User;
  team: User[];
  userSubscription: Subscription | null;

  constructor(private teamService: TeamService,
              private userService: UserService) {
    this.team = [];
    this.userSubscription = null;
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.loggedUser$
      .pipe(skipWhile(value => Object.keys(value).length === 0))
      .subscribe(user => {
        this.user = user;
        this.teamService.getMembersByTeamId(user.teamId).toPromise().then(team => {
          this.team = team.map(u => Object.assign(new User(), u));
        });
      });
  }

  ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }

  handleImageError(event: Event): void {
    (<HTMLImageElement>event.target).src = "assets/images/default_avatar.svg";
  }
}
