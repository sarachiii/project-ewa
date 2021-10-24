import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(protected router : Router,
              protected activivatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
  }
   onRegister(){
     this.router.navigate(['register'])
   }
}
