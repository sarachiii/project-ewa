import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from "../user.service";
import {map} from "rxjs/operators";
import {Role} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Pipe with map to return an Observable<boolean | UrlTree>
    return this.userService.loggedUser$.pipe(
      map(user => {
        let adminRole = user.role == Role.SUPER_ADMIN || user.role == Role.ADMIN;
        if (!adminRole) alert("You do not have the rights to access that page!");
        return adminRole || this.router.createUrlTree([], { relativeTo: this.activatedRoute });
      })
    );
  }
}
