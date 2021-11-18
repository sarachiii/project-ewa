import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {WebStorageService} from "./storage/web-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{


  constructor(
    protected router : Router,
    protected activivatedRouter: ActivatedRoute,
    protected authentocationService :AuthenticationService,
    protected webStorageService: WebStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
    // User can just enter a value in localstorage and access website
    // TODO: Switch over to JWT and cookies
    if (this.webStorageService.getUserId()) {
            return true;
    }
    this.router.navigate(['login']);
    return false;


  }
}
