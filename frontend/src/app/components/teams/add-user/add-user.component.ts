import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../../../services/team.service";
import {Team} from "../../../models/team";
import {UserService} from "../../../services/user.service";
import {Role, User} from "../../../models/user";
import {HttpResponse, HttpStatusCode} from "@angular/common/http";
import {passwordPatternValidator} from "../../../shared/validators/password.validator";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [TeamService]
})
export class AddUserComponent implements OnInit {
  newUserForm: FormGroup;
  teams: Team[];
  Role = Role;
  showErrorMessage: boolean = false;
  email: string = "";

  constructor(private teamService: TeamService,
              private userService: UserService) {
    this.newUserForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      emailAddress: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, passwordPatternValidator]),
      role: new FormControl(Role.MEMBER, Validators.required),
      specialty: new FormControl("Agronomy", Validators.required),
      teamId: new FormControl("", Validators.required)
    })
  }

  get emailAddress() {
    return this.newUserForm.get('emailAddress');
  }

  get password() {
    console.log(
      this.newUserForm.get('password').errors
    )
    return this.newUserForm.get('password')
  }

  ngOnInit(): void {
    this.teamService.getAllTeamIds().subscribe(teams => {
      this.teams = teams;
      if (this.teams.length) this.newUserForm.get('teamId').patchValue(this.teams[0].id)
    })
  }

  onSubmit() {
    if (this.newUserForm.valid) {
      let newUser: User = Object.assign(new User(), this.newUserForm.value);
      this.userService.saveUser(newUser).toPromise().then(user => {
        console.log(user)
        this.showErrorMessage = false;
      }).catch((reason: HttpResponse<any>) => {
        if (reason.status == HttpStatusCode.Conflict) {
          this.showErrorMessage = true;
          this.email = (this.emailAddress.value as string).slice(0);
        }
      });
    }
    console.log(this.newUserForm.valid);
    console.log(this.newUserForm.value);
  }
}
