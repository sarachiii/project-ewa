import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TeamService} from "../../../services/team.service";
import {UserService} from "../../../services/user.service";
import {Role, User} from "../../../models/user";
import {Team} from "../../../models/team";

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.css', '../teams.component.css'],
  providers: [TeamService]
})
export class ViewTeamsComponent implements OnInit, OnDestroy {
  readonly Role = Role;
  private _selectedTeamId: number;
  protected paramsSubscription: Subscription | null;
  user: User;
  teams: Team[] = [];
  public GREENHOUSE_ID: number = 2;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private teamService: TeamService,
              private userService: UserService) {
    this.paramsSubscription = null;
    this.userService.loggedUser$.subscribe(value => {
      this.user = value;
      this.onSelect(this.user.teamId);
    })
    this.teams = this.teamService.findAll();
  }

  get selectedTeamId(): number {
    return this._selectedTeamId;
  }

  set selectedTeamId(value: number) {
    this._selectedTeamId = value;
  }

  ngOnInit(): void {
    this.paramsSubscription =
      this.activatedRoute
        .queryParams
        .subscribe((params) => {
          this.selectedTeamId = params['team'] || -1;
        });
  }

  ngOnDestroy(): void {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
  }

  onSelect(id: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {team: id}
    }).catch(console.error)
  }

  addNewTeam(): void {
    let team = new Team(0, this.GREENHOUSE_ID);
    this.teamService.addTeam(team).subscribe(value => {
      this.teamService.addTeamToList(value);
    });
  }

  deleteTeam() {
    console.log("test");
  }
}
