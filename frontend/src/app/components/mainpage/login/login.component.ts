import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username="";
  password="";
  invalidLogin= false;

  constructor(
    protected router : Router,
    protected activivatedRouter: ActivatedRoute,
    protected authentocationService :AuthenticationService) { }

  ngOnInit(): void {
  }

  checkLogin(){
    if(this.authentocationService.authenticate(this.username,this.password)){
      this.router.navigate(['home']);
      this.invalidLogin= false
    }else {
      this.invalidLogin= true;
    }

  }
   // onRegister(){
   //   this.router.navigate(['register'])
   // }
}
