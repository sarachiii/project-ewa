import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../../services/authentication.service";
import {HttpClient} from "@angular/common/http";

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
    protected http :HttpClient) { }

  ngOnInit(): void {
  }

  async checkLogin(){
    const check = await this.authentocationService.authenticate(this.username,this.password).then(data=>{
      if (data) {
        this.loginErrorMessage= "";
        sessionStorage.setItem('username',this.username);
        this.router.navigate(['home']);
        this.invalidLogin = false;
      }else if(data == undefined){
        this.loginErrorMessage="No account with this username!"
      }else {
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
   // onRegister(){
   //   this.router.navigate(['register'])
   // }
}
