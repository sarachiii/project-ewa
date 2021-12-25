import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../../../services/team.service";
import {Team} from "../../../models/team";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [TeamService]
})
export class AddUserComponent implements OnInit {
  newUserForm: FormGroup;
  teams: Team[];

  constructor(private teamService: TeamService,
              private userService: UserService) {
    this.newUserForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      specialty: new FormControl("", Validators.required),
      teamId: new FormControl("", Validators.required)
    })
  }

  ngOnInit(): void {
    this.teamService.getAllTeamIds().subscribe(teams => {
      this.teams = teams;
    })
  }

  onSubmit() {
    if (this.newUserForm.valid) {
      let newUser: User = Object.assign(new User(), this.newUserForm.value);
      this.userService.saveUser(newUser).toPromise().then(user => {
        console.log(user)
      }).catch(console.error);
    }
    console.log(this.newUserForm.valid);
    console.log(this.newUserForm.value);
  }
}
