import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../../services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {UserService} from "../../../services/user.service";

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

  constructor(
    protected router : Router,
    protected authentocationService :AuthenticationService,
    protected webStorageService: WebStorageService,
    protected userService: UserService,
    protected http :HttpClient) { }

  ngOnInit(): void {
  }

  async checkLogin(){
    const check = await this.authentocationService.authenticate(this.username,this.password).then(data=>{

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


    // console.log(c)
    // this.http.post<any>(environment.hostUrl+"/login",{username:this.username,password:this.password}).subscribe((data)=>{
    //   console.log(data)
    // })
    // if(this.authentocationService.authenticate(this.username,this.password)){
    //   this.router.navigate(['home']);
    //   this.invalidLogin= false
    // }else {
    //   this.invalidLogin= true;
    // }

  }

  onRemember(event: Event) {
    let rememberMe = (<HTMLInputElement>event.currentTarget).checked;
    this.webStorageService.setStorage(rememberMe);
  }
   // onRegister(){
   //   this.router.navigate(['register'])
   // }
}
