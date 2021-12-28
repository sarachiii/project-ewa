import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Role, User} from "../../../../models/user";
import {TeamService} from "../../../../services/team.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-team',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnChanges {
  readonly Role = Role;
  @Input()
  selectedTeamId: number;
  members: User[];
  public team: User[];
  @Input()
  user: User;
  editTeam: boolean;

  constructor(private teamService: TeamService) {
    this.team = [];
    this.editTeam = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.teamService.getTeamById(this.selectedTeamId).pipe(first()).subscribe(value => {
      this.team = value.map(user => Object.assign(new User(), user))
    });
    this.editTeam = false;
  }
}
