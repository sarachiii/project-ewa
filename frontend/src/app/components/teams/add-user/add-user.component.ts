import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../../../services/team.service";
import {Team} from "../../../models/team";
import {UserService} from "../../../services/user.service";
import {Role, User} from "../../../models/user";
import {HttpResponse, HttpStatusCode} from "@angular/common/http";
import {passwordPatternValidator} from "../../../shared/validators/password.validator";
import {isInList} from "../../../shared/validators/custom.validator";
import {Specialty} from "../../../models/specialty";
import {skipWhile} from "rxjs/operators";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [TeamService]
})
export class AddUserComponent implements OnInit {
  newUserForm: FormGroup;
  teamIds: string[] = [];
  user: User = new User();
  Role = Role;
  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;
  email: string = "";
  specialties: Specialty[] = Object.values(Specialty);

  constructor(private teamService: TeamService,
              private userService: UserService) {
    this.newUserForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      emailAddress: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", passwordPatternValidator),
      role: new FormControl("", [Validators.required, isInList(Role.values())]),
      specialty: new FormControl("", [Validators.required, isInList(this.specialties)]),
      teamId: new FormControl("", [Validators.required, isInList(this.teamIds)])
    })
  }

  get firstName() {
    return this.newUserForm.get('firstName');
  }

  get lastName() {
    return this.newUserForm.get('lastName');
  }

  get emailAddress() {
    return this.newUserForm.get('emailAddress');
  }

  get password() {
    return this.newUserForm.get('password');
  }

  get role() {
    return this.newUserForm.get('role');
  }

  get specialty() {
    return this.newUserForm.get('specialty');
  }

  get teamId() {
    return this.newUserForm.get('teamId');
  }

  ngOnInit(): void {
    this.teamService.getAllTeamIds().subscribe(teams => {
      this.teamIds.push(...teams.map(t=>t.id.toString()));
      if (this.teamIds.length) {
        this.teamId.setValidators([Validators.required, isInList(this.teamIds)]);
        this.teamId.updateValueAndValidity({ onlySelf: true });
      }
    });
    this.userService.loggedUser$
      .pipe(skipWhile(value => Object.keys(value).length === 0))
      .subscribe((user) => {
        this.user = user;
      })
  }

  onSubmit() {
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    if (this.newUserForm.valid) {
      Object.keys(this.newUserForm.controls).forEach(key => this.newUserForm.get(key).markAsPristine());
      let newUser: User = Object.assign(new User(), this.newUserForm.value);
      this.userService.saveUser(newUser).toPromise().then(user => {
        this.showSuccessMessage = true;
      }).catch((reason: HttpResponse<any>) => {
        if (reason.status == HttpStatusCode.Conflict) {
          this.showErrorMessage = true;
          this.email = (this.emailAddress.value as string).slice(0);
        }
      });
    } else {
      Object.keys(this.newUserForm.controls).forEach(key => this.newUserForm.get(key).markAsDirty());
    }
  }
}
