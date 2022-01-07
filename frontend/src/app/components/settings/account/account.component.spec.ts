import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { SettingsService } from "../../../services/settings.service";
import { HttpClientModule, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { throwError } from "rxjs";
import { User } from "../../../models/user";

describe('AccountComponent', () => {
  let fixture: ComponentFixture<AccountComponent>;
  let component: AccountComponent;
  let componentHTML: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ SettingsService ],
      declarations: [ AccountComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('Test 0: should create', () => {
    expect(component).toBeTruthy();
    expect(componentHTML).toBeTruthy();
  });

  it('Test 1: Required fields', () => {
    // Arrange: Get UI elements
    const firstNameInput = componentHTML.querySelector('#firstName');
    const lastNameInput = componentHTML.querySelector('#lastName');
    const emailInput = componentHTML.querySelector('#emailAddress');
    const passwordInput = componentHTML.querySelector('#password');

    // Act: Mark inputs as dirty with reactive forms
    component.firstName.markAsDirty();
    component.lastName.markAsDirty();
    component.emailAddress.markAsDirty();
    component.password.markAsDirty();
    fixture.detectChanges();

    // Assert: When input is required but value is empty after a change it should have is-invalid class
    expect(firstNameInput).toHaveClass('is-invalid');
    expect(lastNameInput).toHaveClass('is-invalid');
    expect(emailInput).toHaveClass('is-invalid');
    expect(passwordInput).toHaveClass('is-invalid');
  });

  it('Test 2: Wrong password', (done) => {
    // Arrange
    // Get UI elements
    const passwordInput = componentHTML.querySelector('#password') as HTMLInputElement;
    const submitButton = componentHTML.querySelector('button[type=submit]') as HTMLButtonElement;

    // Mock the user
    component.user = new User();

    // Create a spy and mock the response
    const settingsService = fixture.debugElement.injector.get(SettingsService);
    const spy = spyOn(settingsService, 'updateProfile').and.returnValue(throwError(new HttpErrorResponse({
      error: {
        message: 'Password is wrong'
      },
      status: HttpStatusCode.BadRequest
    })));

    // Act: Fill in the required fields and click on submit
    component.firstName.setValue('First name');
    component.firstName.updateValueAndValidity();
    component.lastName.setValue('Last name');
    component.lastName.updateValueAndValidity();
    component.emailAddress.setValue('email@address.com');
    component.emailAddress.updateValueAndValidity();
    component.password.setValue('password');
    component.password.updateValueAndValidity();
    component.accountForm.markAsDirty();
    fixture.detectChanges();

    submitButton.click();

    fixture.detectChanges();

    // Assert: Password should be invalid
    spy.calls.mostRecent().returnValue.subscribe(() => {
      // Nothing to test here
    }, (error) => {
      expect(error).toBeInstanceOf(HttpErrorResponse);

      const errorMessage = (<HttpErrorResponse>error).error["message"];
      expect(errorMessage).toBeTruthy();
      expect(errorMessage).toContain('Password is wrong');

      expect(passwordInput).toHaveClass('is-invalid');

      // Feedback element does not exist in the DOM until password is invalid or dirty
      const invalidFeedback = passwordInput.nextElementSibling;
      expect(invalidFeedback).toBeTruthy();
      expect(invalidFeedback).toHaveClass('invalid-feedback');

      expect(invalidFeedback.innerHTML).toContain('Password is wrong');
      done();
    });
  });

  it('Test 3: Validate new password', () => {
    // Arrange: Get UI elements
    const newPasswordInput = componentHTML.querySelector('#newPassword') as HTMLInputElement;
    const confirmPasswordInput = componentHTML.querySelector('#confirmPassword') as HTMLInputElement;

    // Act 1: Change value of new password to one character
    component.newPassword.setValue(' ');
    component.newPassword.updateValueAndValidity();
    fixture.detectChanges();

    // Assert 1: Immediate sibling of password should have .invalid-feedback class
    let newPasswordFeedback = newPasswordInput.nextElementSibling;
    let confirmPasswordFeedback = confirmPasswordInput.nextElementSibling;
    expect(newPasswordFeedback).toBeTruthy();
    expect(confirmPasswordFeedback).toBeTruthy();
    expect(component.newPassword.hasError('length')).toBeTrue();
    expect(component.newPassword.hasError('number')).toBeTrue();
    expect(component.newPassword.hasError('upperCase')).toBeTrue();
    expect(component.newPassword.hasError('lowerCase')).toBeTrue();
    expect(component.newPassword.hasError('illegalChars')).toBeTrue();
    expect(component.newPasswordForm.hasError('mismatch')).toBeTrue();

    // Act 2: Change value of new password to alphabetical character
    component.newPassword.setValue('a');
    component.newPassword.updateValueAndValidity();
    fixture.detectChanges();

    // Assert 2: Certain errors should be false now
    expect(component.newPassword.hasError('length')).toBeTrue();
    expect(component.newPassword.hasError('number')).toBeTrue();
    expect(component.newPassword.hasError('upperCase')).toBeTrue();
    expect(component.newPassword.hasError('lowerCase')).toBeFalse();
    expect(component.newPassword.hasError('illegalChars')).toBeFalse();
    expect(component.newPasswordForm.hasError('mismatch')).toBeTrue();

    // Act 2: Change value of new password to alphanumerical characters
    component.newPassword.setValue('Abcd1234');
    component.newPassword.updateValueAndValidity();
    fixture.detectChanges();

    // Assert 2: New password and confirmation password should not match yet
    expect(newPasswordInput).toHaveClass('is-invalid');
    expect(confirmPasswordInput).toHaveClass('is-invalid');
    expect(component.newPasswordForm.hasError('mismatch')).toBeTrue();

    // Act 3: Confirm the new password
    component.confirmPassword.setValue('Abcd1234');
    component.confirmPassword.updateValueAndValidity();
    fixture.detectChanges();

    // Assert 3: New password and confirmation password should match
    expect(newPasswordInput).toHaveClass('is-valid');
    expect(confirmPasswordInput).toHaveClass('is-valid');
    expect(component.newPasswordForm.valid).toBeTrue();
    expect(newPasswordInput.value).toEqual(confirmPasswordInput.value);
  });
});
