import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../../services/authentication.service";
import {HttpClient, HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {ValidationErrors} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email="";
  password="";
  loginErrorMessage= "";
  invalidLogin= false;

  user = new User();

  constructor(
    protected router: Router,
    public authentocationService: AuthenticationService,
    protected webStorageService: WebStorageService,
    protected userService: UserService,
    protected http: HttpClient) {
  }

  ngOnInit(): void {
  }


  checkLoginToken(){

    this.authentocationService.authenticateToken(this.email,this.password).subscribe(data => {
      // console.log(data);
      if (data) {
        this.loginErrorMessage= "";
        this.webStorageService.set('userId', data['body']['id']);
        this.router.navigate(['home']).catch(reason => console.log(reason))
        this.userService.updateLoggedUser(data['body']['id']);
        this.invalidLogin = false;
      }
    },error => {
      // console.log(error)
      try {
        let httpErrorResponse = (<HttpErrorResponse>error);
        if (httpErrorResponse.status == HttpStatusCode.Forbidden||httpErrorResponse.status == HttpStatusCode.NotFound) {
          this.loginErrorMessage = httpErrorResponse.error["message"];
        }
      }catch (e){
        // console.log(e)
      }
    });

  }

  onRemember(event: Event) {
    let rememberMe = (<HTMLInputElement>event.currentTarget).checked;
    this.webStorageService.setStorage(rememberMe);
  }

}
