import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {catchError, switchMap} from "rxjs/operators";
import {WebStorageService} from "./storage/web-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  x: number;

  constructor(private authenticationService: AuthenticationService,
              private webStorageService: WebStorageService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //dont check a authentication request
    if (req.url.endsWith('auth/login')) {
      return next.handle(req);
    } else {
      //if token exists in the webstorage add it to every request
      if (this.authenticationService.currentToken) {
        req = this.addToken(req, "Bearer " + this.authenticationService.currentToken)
      }
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          //authentication error
          if (error && error.status == 401) {
            // force authentication if it was a failed attempt to refresh the token
            if (req.url.endsWith("auth/refresh-token")) {
              this.forceLogoff();
              return throwError(error);
            } else {
              //try to extent the time expiration of an existed token by making a request to the backend
              return this.authenticationService.refreshToken().pipe(
                switchMap((data) => {
                  // getting the returned token
                  const token = data['headers'].get('Authorization');
                  // trying again with the returned token
                  return next.handle(this.addToken(req, data['headers'].get('Authorization')));
                })
              );
            }
          } else {
            return throwError(error);
          }
        })
      )
      //Add the token header if exist
    }


  }
  //clone the request an add a token to the header
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
  }

  private forceLogoff() {
    this.authenticationService.logOut();
    this.webStorageService.remove("userId");
    this.router.navigate(['login'], {queryParams: {msg: 'session expired'}});
  }
}
