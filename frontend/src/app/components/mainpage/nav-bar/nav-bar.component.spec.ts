import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarComponent} from './nav-bar.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";
import {User} from "../../../models/user";

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let componentHTML: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create instances', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
    expect(componentHTML).toBeTruthy();
  });

  it('Should show the nav-bare items when user is logged in ', () => {

    //ACT: return a true value for checking the logedIn user
    spyOn(component, "isLoggedIn").and.returnValue(true);
    fixture.detectChanges();

    //Assert: check if navItems are visible in the navbas
    expect(fixture.debugElement.query(By.css("#navbarToggler")).nativeElement).toBeTruthy();

  });

  it('Should show the user name in the dropdown by getting the properties firstname and lastname after they were updated ', (d) => {
    //Arrange: mock the user
    const user = component.user = new User();

    //ACT: return a true value for checking the logedIn user
    spyOn(component, "isLoggedIn").and.returnValue(true);
    fixture.detectChanges();

    //set the first name and last namen
    user.firstName = "RandomFirstName";
    user.lastName = "RandomLastName";
    fixture.detectChanges();
    const firstNameSpanElement: HTMLSpanElement = componentHTML.querySelector('#firstname')
    const lastNameSpanElement: HTMLSpanElement = componentHTML.querySelector('#lastname')


    //Assert: check if the updated user info is displayed on the screen
    expect(firstNameSpanElement.innerText).toEqual(user.firstName);
    expect(lastNameSpanElement.innerText).toEqual(user.lastName);
    d()
  });
});
