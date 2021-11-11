import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
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

  constructor() {
    this.user = new User(0, Role.ADMIN, "Botanist", "Sjors", "Peters",
      "https://yt3.ggpht.com/fAfB4LQvATPHhF9ou35zv5FZmXVhMtGnW_vZQNpyd_Krkzasu48k53I3UTIxcqNyMioqK4PR0w=s900-c-k-c0x00ffffff-no-rj",
      "sjors.peters@climatecleanup.org", "password1");
    this.copyUser = Object.assign<User, User>(this.copyUser, this.user);
    this.copyUser.password = '';

    // TODO: Should accountForm be initialised before this method is called?
    this.accountFormInit();
    this.newPasswordFormInit();
  }

  ngOnInit(): void {
    // get logged in user
    this.onReset();
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

  get isEmptyPasswordForm(): boolean {
    return !this.newPassword.value && !this.confirmPassword.value;
  }

  private accountFormInit(): void {
    this.accountForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      profilePicture: new FormControl(''),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, control => PasswordValidator.matches(control, this.user?.password)])
    });
  }

  private newPasswordFormInit(): void {
    this.newPasswordForm = new FormGroup({
      password: new FormControl('', PasswordValidator.pattern),
      confirmPassword: new FormControl('')
    }, PasswordValidator.matches);
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
    console.log(this.newPasswordForm.errors)
    this.firstName.markAsDirty();
    this.lastName.markAsDirty();
    this.emailAddress.markAsDirty();
    this.password.markAsDirty();
    if (this.accountForm.valid && this.newPasswordForm.valid) {
      if(!this.isEmptyPasswordForm) {
        //TODO: Include new password
      }
      // TODO: stuff with frontend service and backend
    } else {
      // stuff fail
    }
  }
}
