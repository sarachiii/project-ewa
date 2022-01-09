import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable, of} from 'rxjs';
import {Role, User} from "../models/user";
import {JwtHelperService} from "@auth0/angular-jwt";
import {catchError, share} from 'rxjs/operators';
import {LoginComponent} from "../components/mainpage/login/login.component";
import {WebStorageService} from "./storage/web-storage.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: User = null;

  jwtService = new JwtHelperService();

  constructor(protected http: HttpClient,
              protected webStorage: WebStorageService) {
  }



  authenticateToken(email, password) {
    const observable = this.http.post(environment.apiUrl + "/auth/login",
      {email: email, password: password},
      {observe: 'response'}).pipe(share());
    observable.subscribe((data) => {

      let token = data?.headers.get('Authorization')
      if (token == null) {
        throw new Error('not token present in the response')
      }

      token.replace('Bearer ', '');
      this.webStorage.set("token",token);
      // sessionStorage.setItem('token', token);
      this.updateUserInformation();
    });
    return observable;

  }

  get currentToken(): string {
    return this.webStorage.get('token');
  }

  private updateUserInformation(): void {
    if (this.currentToken) {

      const decodedToken = this.jwtService.decodeToken(this.currentToken);

      this.currentUser = new User();
      this.currentUser.emailAddress = decodedToken.email;
      if (decodedToken.admin) {
        this.currentUser.role = Role.ADMIN;
      }

    } else {
      this.currentUser = null;
    }
  }

  refreshToken(): Observable<any> {

    const observable = this.http.post(`${environment.apiUrl}/auth/refresh-token`, {},
      {headers: new HttpHeaders({Authorization: this.currentToken}), observe: 'response'}).pipe(share());

    observable.subscribe(data => {

        let refreshedToken = data.headers.get('Authorization');

        if (refreshedToken == null) {
          throw new Error('token was not present in the response');
        }
        refreshedToken = refreshedToken.replace('Bearer ', '');

        this.webStorage.set('token', refreshedToken);

        this.updateUserInformation();
      },
      (err) => {
        this.logOut();
      });

    return observable;
  }


  logOut() {
    this.webStorage.remove('token')
  }




}
