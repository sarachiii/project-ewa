import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{


  constructor(
    protected router : Router,
    protected activivatedRouter: ActivatedRoute,
    protected authentocationService :AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if (this.authentocationService.isUserLoggedIn()){
            return true;
    }
    this.router.navigate(['login']);
    return false;


  }
}
