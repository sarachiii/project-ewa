import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Role, User} from "../../../../models/user";
import {TeamService} from "../../../../services/team.service";
import {first} from "rxjs/operators";
import {UserService} from "../../../../services/user.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-team',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnChanges {
  readonly Role = Role;
  deleteSuccessful: boolean = false;
  @Input()
  selectedTeamId: number;
  public team: User[];
  @Input()
  user: User;
  editTeam: boolean;

  constructor(private teamService: TeamService, private  userService: UserService, private notificationService: NotificationsService) {
    this.team = [];
    this.editTeam = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.teamService.getTeamById(this.selectedTeamId).pipe(first()).subscribe(value => {
      this.team = value.map(u => Object.assign(new User(), u));
    });
    this.editTeam = false;
  }

  deleteMember(id: any) {
    this.userService.deleteUser(id).subscribe(value => {
      if(value){
        let index = this.team.findIndex(member => member.id == id);
        this.team.splice(index, 1);
        this.onSucces("User was successfully deleted!");
      }
    });
  }

  onSucces(message){
    this.deleteSuccessful = true;
    this.notificationService.success("Success", message, {
      timeOut: 2000,
      animate: 'fade',
    });
    setTimeout(() => {
      this.deleteSuccessful = false;
    }, 3000);
  }
}
