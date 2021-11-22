import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../models/user";
import { SettingsService } from "../../../services/settings.service";
import { passwordPatternValidator, passwordValidator} from "../../../shared/validators/password.validator";
import { requireOneDisableAll } from "../../../shared/validators/custom.validator";
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {UserService} from "../../../services/user.service";
import {Subscription} from "rxjs";
import {first, skipWhile} from "rxjs/operators";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  copyUser: User = <User>{};
  // TODO: change name to profileForm
  accountForm: FormGroup;
  newPasswordForm: FormGroup;
  deleteProfilePicture: boolean;

  constructor(protected settingsService: SettingsService,
              protected webStorageService: WebStorageService,
              protected userService: UserService) {

    // TODO: NotificationService

    // TODO: Should accountForm be initialised before this method is called?
    this.accountFormInit();
    this.newPasswordFormInit();

  }

  ngOnInit(): void {
    // Reset has all the initial values
    this.userService.loggedUser$.pipe(skipWhile(value => Object.keys(value).length === 0), first()).subscribe(value => {
      this.user = value;
      this.copyUser = Object.assign<User, User>(this.copyUser, this.user);
      this.onReset();
    });

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
      password: new FormControl('')
    });
  }

  private newPasswordFormInit(): void {
    this.newPasswordForm = new FormGroup({
      password: new FormControl('', [passwordPatternValidator, Validators.required]),
      confirmPassword: new FormControl('', Validators.required)
    }, passwordValidator());
  }

  onClear(clearUrl?: boolean) {
    if (clearUrl) {
      this.url.reset('')
    }
    this.file.reset('');
    // console.log(this.pictureForm)
  }

  onReset() {
    this.userService.loggedUser$.pipe(first()).subscribe(value => {
      this.user = value;
      this.copyUser = Object.assign<User, User>(this.copyUser, this.user);
      this.accountForm.reset();
      this.newPasswordForm.reset();
      this.pictureForm.reset();
      this.deleteProfilePicture = false;
      this.accountFormInit();
      this.newPasswordFormInit();
      this.accountForm.patchValue(this.copyUser);
      this.password.reset('');
      // console.log(this.copyUser)
      this.password.setValidators([Validators.required, passwordValidator(this.copyUser.password)]);
    }, error => console.error)
  }

  onSubmit() {
    // Re-evaluate the password
    this.password.setValidators([Validators.required, passwordValidator(this.copyUser.password)])
    this.password.updateValueAndValidity();

    // Update user if form is (still) valid
    if (this.accountForm.valid) {
      // TODO: Remove updateUser or change code to match
      // Combine values into an updated user
      let updatedUser = <User>{...this.copyUser, ...this.accountForm.value};

      // A new valid password has been supplied replace old password
      if (this.newPasswordForm.valid) {
        updatedUser.password = this.newPassword.value;
      }

      // If file chosen upload it else choose url as image
      if (this.file.value && this.file.enabled) {
        // console.log(this.file)
        // updatedUser.profilePicture = this.file.value;
        // TODO: upload file somewhere and use link as path OR start a file server?
      } else if (this.url.value && this.url.enabled) {
        // TODO: requiredtypes, fetch image check mimetype, validator
        updatedUser.profilePicture = this.url.value;
      }

      // Update the user
      //this.settingsService.save(Object.assign<User, User>(this.copyUser, updatedUser));
      this.settingsService.updateProfile(this.webStorageService.getAsNumber('userId'),
        {
          ...this.accountForm.value,
          newPasswordForm: this.newPasswordForm.value,
          deleteProfilePicture: this.deleteProfilePicture
        }).subscribe(e=>{
        console.log(e)

        this.userService.updateLoggedUser(this.webStorageService.getUserId());
        // this.userService.loggedUser$.pipe(first()).subscribe(value => {this.copyUser = value})
      }, error => {
        console.log(error)})


      // TODO: stuff with frontend service and backend UserController
    }

    // Mark the fields as dirty to show visual validity
    this.firstName.markAsDirty();
    this.lastName.markAsDirty();
    this.emailAddress.markAsDirty();
    this.password.markAsDirty();
  }

  onDelete() {
    // Remove the profile picture
    this.pictureForm.reset({file: '', url: ''});
    this.copyUser.profilePicture = '';
    this.deleteProfilePicture = true;
    this.accountForm.markAsDirty();
  }
}
