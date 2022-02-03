import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable, of} from 'rxjs';
import {Role, User} from "../models/user";
import {JwtHelperService} from "@auth0/angular-jwt";
import {share} from 'rxjs/operators';
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
    //do the login request to the backend and store the token in the webStorage
    const observable = this.http.post(
      environment.apiUrl + "/auth/login",
      {email: email, password: password},
      {observe: 'response'}).pipe(share());


    observable.subscribe((data) => {
      //read the token from the header
      let token = data?.headers.get('Authorization')
      if (token == null) {
        throw new Error('not token present in the response')
      }

      //remove the bearer word from the token
      token.replace('Bearer ', '');

      //add the token to the webStorage
      this.webStorage.set("token", token);

      //read the role of the user from the token
      this.updateUserInformation();
    });
    return observable;

  }

  get currentToken(): string {
    return this.webStorage.get('token');
  }


  private updateUserInformation(): void {
    if (this.currentToken) {
      //decode the token to make the payload readable
      const decodedToken = this.jwtService.decodeToken(this.currentToken);

      this.currentUser = new User();

      this.currentUser.emailAddress = decodedToken.email;
      //set the role to admin if true(the default is MEMBER)
      if (decodedToken.admin) {
        this.currentUser.role = Role.ADMIN;
      }

    } else {
      this.currentUser = null;
    }
  }

  refreshToken(): Observable<any> {

    //Do the request to extend the expiration time of an valid token
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
