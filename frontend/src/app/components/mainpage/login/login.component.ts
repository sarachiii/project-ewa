import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../../services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username="";
  password="";
  loginErrorMessage= "";
  invalidLogin= false;

  user = new User();

  constructor(
    protected router : Router,
    public authentocationService :AuthenticationService,
    protected webStorageService: WebStorageService,
    protected userService: UserService,
    protected http :HttpClient) { }

  ngOnInit(): void {
  }


  async checkLogin(){
    const check = this.authentocationService.authenticate(this.username,this.password).then(data=>{

      console.log(data)
      if (data) {
        this.loginErrorMessage= "";
        this.userService.updateLoggedUser(data);
        this.webStorageService.set('userId', `${data}`);
        this.router.navigate(['home']);
        this.invalidLogin = false;
      } else if (data === undefined) {
        this.loginErrorMessage="No account with this username!"
      } else {
        this.loginErrorMessage = "The password and the username does not match!"
        this.invalidLogin = true
      }
    });

  }
  checkLoginToken(){

    this.authentocationService.authenticateToken(this.username,this.password).subscribe(data=>{

      if (data) {
        this.loginErrorMessage= "";
        this.userService.updateLoggedUser(data['body']['id']);
        this.webStorageService.set('userId', data['body']['id']);
        this.router.navigate(['home']);
        this.invalidLogin = false;
      } else if (data === undefined) {
        this.loginErrorMessage="No account with this username!"
      } else {
        this.loginErrorMessage = "The password and the username does not match!"
        this.invalidLogin = true
      }
    });

  }

  onRemember(event: Event) {
    let rememberMe = (<HTMLInputElement>event.currentTarget).checked;
    this.webStorageService.setStorage(rememberMe);
  }
   // onRegister(){
   //   this.router.navigate(['register'])
   // }
}
