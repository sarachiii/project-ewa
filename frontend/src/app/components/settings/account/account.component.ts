import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Role, User } from "../../../models/user";
import { PasswordValidator } from "../../../validators/password.validator";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  copyUser: User = <User>{};
  accountForm: FormGroup;
  newPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.user = new User(0, Role.ADMIN, "Botanist", "Sjors", "Peters",
      "https://yt3.ggpht.com/fAfB4LQvATPHhF9ou35zv5FZmXVhMtGnW_vZQNpyd_Krkzasu48k53I3UTIxcqNyMioqK4PR0w=s900-c-k-c0x00ffffff-no-rj",
      "sjors.peters@climatecleanup.org", "password1");
    this.copyUser = Object.assign(this.copyUser, this.user);
    this.copyUser.password = '';

    // TODO: Should accountForm be initialised before this method is called?
    this.accountFormInit();
    this.newPasswordFormInit();
  }

  private accountFormInit(): void {
    this.accountForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      profilePicture: new FormControl(''),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, PasswordValidator.with(this.user?.password).current])
    });
  }

  private newPasswordFormInit(): void {
    this.newPasswordForm = new FormGroup({
      password: new FormControl('', PasswordValidator.pattern),
      confirmPassword: new FormControl('')
    }, PasswordValidator.newGroup);
  }

  get firstName() {
    return this.accountForm.get('firstName');
  }

  get lastName() {
    return this.accountForm.get('lastName');
  }

  get emailAddress() {
    return this.accountForm.get('emailAddress');
  }

  get password() {
    return this.accountForm.get('password');
  }

  get newPassword() {
    return this.newPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.newPasswordForm.get('confirmPassword');
  }

  ngOnInit(): void {
    // get logged in user
    this.onReset();
  }

  onReset() {
    this.accountForm.reset();
    this.newPasswordForm.reset();
    this.accountFormInit();
    this.newPasswordFormInit();
    this.accountForm.patchValue(this.copyUser);
  }

  onSubmit() {
    console.log(this.accountForm.value)
    this.firstName.markAsDirty();
    this.lastName.markAsDirty();
    this.emailAddress.markAsDirty();
    this.password.markAsDirty();
    if (this.accountForm.valid) {
      // TODO: stuff with frontend service and backend
    } else {
      // stuff fail
    }
  }
}
