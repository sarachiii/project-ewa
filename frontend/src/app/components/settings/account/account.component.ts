import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../models/user";
import { SettingsService } from "../../../services/settings.service";
import { passwordPatternValidator, passwordValidator} from "../../../shared/validators/password.validator";
import { requireOneDisableAll } from "../../../shared/validators/custom.validator";

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

  constructor(protected settingsService: SettingsService) {
    this.user = this.settingsService.findById(this.settingsService.loggedInUser().id);
    // TODO: NotificationService

    // TODO: Should accountForm be initialised before this method is called?
    this.accountFormInit();
    this.newPasswordFormInit();
  }

  ngOnInit(): void {
    // get logged in user
    this.copyUser = Object.assign<User, User>(this.copyUser, this.user);
    this.copyUser.password = '';
    this.onReset();
  }

  get firstName() {
    return this.accountForm.get('firstName');
  }

  get lastName() {
    return this.accountForm.get('lastName');
  }

  get pictureForm() {
    return this.accountForm.get('pictureForm');
  }

  get file() {
    return this.pictureForm.get('file');
  }

  get url() {
    return this.pictureForm.get('url');
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

  private accountFormInit(): void {
    this.accountForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      pictureForm: new FormGroup({
        file: new FormControl(''),
        url: new FormControl('')
      }, requireOneDisableAll),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator(this.user.password)])
    });
  }

  private newPasswordFormInit(): void {
    this.newPasswordForm = new FormGroup({
      password: new FormControl('', [passwordPatternValidator, Validators.required]),
      confirmPassword: new FormControl('', Validators.required)
    }, [passwordValidator()]);
  }

  onClear(clearUrl?: boolean) {
    if (clearUrl) {
      this.url.reset('')
    }
    this.file.reset('');
    console.log(this.pictureForm)
  }

  onReset() {
    this.accountForm.reset();
    this.newPasswordForm.reset();
    this.pictureForm.reset();
    this.accountFormInit();
    this.newPasswordFormInit();
    this.accountForm.patchValue(this.copyUser);
  }

  onSubmit() {
    console.log(this.accountForm.value);
    console.log(this.newPasswordForm.errors);
    this.firstName.markAsDirty();
    this.lastName.markAsDirty();
    this.emailAddress.markAsDirty();
    this.password.markAsDirty();
    if (this.accountForm.valid) {
      let updatedUser = <User>{...this.accountForm.value};
      if (this.newPasswordForm.valid) {
        updatedUser.password = this.newPassword.value;
        // Update validity with new password
        this.password.updateValueAndValidity();
      }
      if (this.file.value && this.file.enabled) {
        console.log(this.file)
        // updatedUser.profilePicture = this.file.value;
        // upload file somewhere and use link as path
      } else if (this.url.value && this.url.enabled) {
        // TODO: requiredtypes, fetch image check mimetype
        updatedUser.profilePicture = this.url.value;
      }
      Object.assign<User, User>(this.user, updatedUser)
      console.log(this.settingsService.findAll()[0])
      console.log('here',this.settingsService.loggedInUser());
      // TODO: stuff with frontend service and backend
      console.log(this.password);
    } else {
      // stuff fail
    }
  }
}
