import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {SettingsService} from "../../../services/settings.service";
import {passwordPatternValidator, passwordValidator} from "../../../shared/validators/password.validator";
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {UserService} from "../../../services/user.service";
import {Subscription} from "rxjs";
import {skipWhile} from "rxjs/operators";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  user: User;
  copyUser: User = new User();
  accountForm: FormGroup;
  newPasswordForm: FormGroup;
  deleteProfilePicture: boolean;
  preview: string;
  private userSubscription: Subscription | null;

  constructor(protected settingsService: SettingsService,
              protected webStorageService: WebStorageService,
              protected userService: UserService) {
    this.accountFormInit();
    this.newPasswordFormInit();
    this.userSubscription = null;
  }

  ngOnInit(): void {
    // Reset has all the initial values
    this.userSubscription = this.userService.loggedUser$
      .pipe(skipWhile(value => Object.keys(value).length === 0)).subscribe(value => {
        this.user = value;
        this.copyUser = Object.assign<User, User>(this.copyUser, this.user);
        this.onReset();
      });

  }

  ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }

  get firstName() {
    return this.accountForm.get('firstName');
  }

  get lastName() {
    return this.accountForm.get('lastName');
  }

  get file() {
    return this.accountForm.get('file');
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
      file: new FormControl(''),
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

  onClear(file: HTMLInputElement) {
    this.file.reset('');
    this.preview = '';
    file.value = '';
  }

  onReset() {
    this.copyUser = Object.assign<User, User>(this.copyUser, this.user);
    this.accountForm.reset();
    this.newPasswordForm.reset();
    this.deleteProfilePicture = false;
    this.accountFormInit();
    this.newPasswordFormInit();
    this.accountForm.patchValue(this.copyUser);
    this.file.reset('');
    this.password.reset('');
    this.preview = '';
  }

  onSubmit() {
    // Update user if form is (still) valid
    if (this.accountForm.valid) {
      const formData = new FormData();

      const accountFormBlob = new Blob([JSON.stringify({
        ...this.accountForm.value,
        newPasswordForm: this.newPasswordForm.value,
        deleteProfilePicture: this.deleteProfilePicture
      })], {type: 'application/json'});

      formData.set('file', this.file.value);
      formData.set('accountForm', accountFormBlob);

      this.settingsService.updateProfile(this.user.id, formData)
        .subscribe(e => {
          this.password.setErrors(null);
          this.userService.updateLoggedUser(this.user.id);
        }, error => {
          try {
            let httpErrorResponse = (<HttpErrorResponse>error);
            if (httpErrorResponse.status == HttpStatusCode.BadRequest) {
              let message = httpErrorResponse.error["message"];

              // Evaluate the password
              if (message && message == 'Password is wrong') {
                let errors: ValidationErrors = {
                  mismatch: true
                };
                this.password.setErrors(errors);
              }
            }
          } catch (e) {
            console.error(e);
          }
        });
    }

    // Mark the fields as dirty to show visual validity
    this.firstName.markAsDirty();
    this.lastName.markAsDirty();
    this.emailAddress.markAsDirty();
    this.password.markAsDirty();
  }

  onDelete() {
    // Remove the profile picture
    this.file.reset('');
    this.preview = '';
    this.copyUser.profilePicture = '';
    this.deleteProfilePicture = true;
    this.accountForm.markAsDirty();
  }

  handleImageError(event: Event) {
    (<HTMLImageElement>event.target).src = "assets/images/default_avatar.svg";
  }

  onChangeFile(event: Event) {
    const file = (<HTMLInputElement>event.target).files[0];
    if (file) {
      this.file.patchValue(file);
      this.file.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      }
      reader.readAsDataURL(file);
    } else {
      this.preview = '';
    }
  }
}
