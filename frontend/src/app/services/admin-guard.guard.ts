import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import {WebStorageService} from "./storage/web-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(private adminauth: AuthenticationService, private router: Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // the authorization and the authentication of the admin
    //Calling a user service admin username and admin password must be correct
    if(this.adminauth.adminIsLoggedIn()) {
      return true;
    }
    alert("You need to login first!")
    this.router.navigate(['login'])
    return false

    let Role = localStorage.getItem("usertype")
    if (Role == "admin"){
      return true;
    }
    else alert("You don't have admin rights")
    return false
  }


}
