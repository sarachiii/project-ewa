import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {from, throwError} from "rxjs";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let componentHtml: HTMLElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthenticationService, UserService, WebStorageService],
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule
      ]
    })
      .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    // fixture.nativeElement.remove('from')
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

  it('Test the email and password properties binding ', () => {
    //Arrange:
    // getting the email and the password values
    const emailInput: HTMLInputElement = componentHtml.querySelector('#login');
    const passwordInput: HTMLInputElement = componentHtml.querySelector("#password");

    //ACT:
    //updating the input values
    emailInput.value = "user"
    passwordInput.value = "1234"
    emailInput.dispatchEvent(new Event('input'))
    passwordInput.dispatchEvent(new Event('input'))
    fixture.detectChanges();

    //Assert: checks if the properties are updated
    expect(component.email).toEqual(emailInput.value);
    expect(component.password).toEqual(passwordInput.value);
  });


  it('loginErrorMessage property should by updated after an error', (done) => {
    //Arrange:
    //get the login error messeage
    const button: HTMLInputElement = componentHtml.querySelector('#submitButton')
    //the propperty should be empty before login
    expect(component.loginErrorMessage).toBe('');

    //ACT:
    //update the user email and password
    component.email = "user"
    component.password = "1234"
    //return a error message with the respnse
    const authService = fixture.debugElement.injector.get(AuthenticationService)
    const spy = spyOn(authService, 'authenticateToken').and.returnValue(throwError(new HttpErrorResponse({
      error: {
        message: 'error'
      },
      status: HttpStatusCode.Forbidden
    })));

    //click the button to do the request and detect the changes
    button.click()
    fixture.detectChanges();

    spy.calls.mostRecent().returnValue.subscribe(() => {
      // nothing to do here
    }, (error) => {
      //Assert:
      //check if the error messege was sended with the request is the same value as the log in message property
      expect(component.loginErrorMessage).toEqual('error')
      done();
    })
  });

});
