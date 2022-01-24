import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddUserComponent} from './add-user.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {Role, User} from "../../../models/user";
import {throwError} from "rxjs";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {Specialty} from "../../../models/specialty";

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [UserService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

  /**
   * @author Nazlıcan Eren
   */
  it('Error alert should show when email already exists', (done) => {
    // Arrange
    // Get UI element
    const submitButton: HTMLButtonElement = componentHtml.querySelector('button[type=submit]');

    // Mock the user
    component.user = new User();

    // Mock team id to team ids list
    component.teamIds.push(1 + "");

    // Create a spy and mock the response
    const userService = fixture.debugElement.injector.get(UserService);
    const spy = spyOn(userService, 'saveUser').and.returnValue(
      throwError(new HttpErrorResponse({
        error: {
          message: 'User with sjors.peters@climatecleanup.org already exists.'
        },
        status: HttpStatusCode.Conflict
      })));

    // Act: Fill in the required fields and click on submit
    component.firstName.setValue('First name');
    component.firstName.updateValueAndValidity();
    component.lastName.setValue('Last name');
    component.lastName.updateValueAndValidity();
    component.emailAddress.setValue('sjors.peters@climatecleanup.org'); // Email already exists in the database
    component.emailAddress.updateValueAndValidity();
    component.password.setValue('Password123!');
    component.password.updateValueAndValidity();
    component.role.setValue(Role.SUPER_ADMIN);
    component.role.updateValueAndValidity();
    component.specialty.setValue(Specialty.BOTANY);
    component.specialty.updateValueAndValidity();
    component.teamId.setValue(component.teamIds[0]);
    component.teamId.updateValueAndValidity();

    component.newUserForm.markAsDirty();
    fixture.detectChanges();

    submitButton.click();
    fixture.detectChanges();

    // Assert: Email should exist
    spy.calls.mostRecent().returnValue.toPromise().then(() => {
      // Nothing to test here
    }).catch((error) => {
      expect(error).toBeInstanceOf(HttpErrorResponse);
      const errorMessage = (<HttpErrorResponse>error).error["message"];
      expect(errorMessage).toBeTruthy();
      expect(errorMessage).toContain('User with sjors.peters@climatecleanup.org already exists.');

      expect(component.showErrorMessage).toBeTrue();
      fixture.detectChanges();
      // Get UI element
      const emailExistsMessage: HTMLSpanElement = componentHtml.querySelector('#emailExistsMessage');
      expect(emailExistsMessage.innerText).toContain('Error! User with sjors.peters@climatecleanup.org already exists.');
      done();
    });
  });
});
