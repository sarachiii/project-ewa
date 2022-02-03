import {Injectable} from '@angular/core';
import {
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
              protected authenticationService: AuthenticationService,
              protected webStorageService: WebStorageService
  ) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //if there is user logged in, give access to the page
    if (this.webStorageService.getUserId()) {
      //navigate to the home page if a logged in user tries to go to the login page
      if (state.url == '/login') {
        this.router.navigate(['home']).catch(reason => {
          console.log(reason);
        });
        return false;
      }
      return true;
    } else if (state.url == '/login') {
      //the user can get to the login page without being loged in
      return true;
    }

    //if there is no user loggedin always navigatie to login and return false
    this.router.navigate(['login']).catch(reason => {
      console.log(reason);
    });
    return false;
  }


}
