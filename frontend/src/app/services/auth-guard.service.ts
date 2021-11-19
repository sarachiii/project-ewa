import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import {WebStorageService} from "./storage/web-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {


  constructor(protected router: Router,
              protected activatedRoute: ActivatedRoute,
              protected authenticationService: AuthenticationService,
              protected webStorageService: WebStorageService
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // User can just enter a value in localstorage and access website
    // TODO: Switch over to JWT and cookies
    if (this.webStorageService.getUserId()) {
      if(state.url == '/login') {
        this.router.navigate(['home']).catch(reason => { console.log(reason); });
        return false;
      }
      return true;
    } else if (state.url == '/login') {
      return true;
    }
    this.router.navigate(['login']).catch(reason => { console.log(reason); });
    return false;
  }


}
