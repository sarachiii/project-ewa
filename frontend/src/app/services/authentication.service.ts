import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
import {Role, User} from "../models/user";
import {JwtHelperService} from "@auth0/angular-jwt";
import {share} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: User = null;

  jwtService = new JwtHelperService();

  constructor(protected http: HttpClient) {
  }

  authenticate(email: String, password: String): Promise<number | void> {

    const request = this.http.post<number>(environment.apiUrl + "/login", {
      email: email,
      password: password
    }).toPromise().catch(error => {
      console.log(error.error)
    })
    return Promise.resolve(request);
  }

  authenticateToken(email,password){
    const observable = this.http.post(environment.apiUrl + "/auth/login"/*"http://localhost:8084/authenticate/login"*/,
      {email:email, password:password},
      {observe: 'response'}).pipe(share());
    observable.subscribe((data) => {

      let token = data.headers.get('Authorization')
      if (token == null){
        throw new Error('not token present in the response')
      }

      token.replace('Bearer','');

      sessionStorage.setItem('token',token);
      this.updateUserInformation();
      },error =>{
      this.logOut();
    } )
    return observable ;
  }

  get currentToken(): string {
    return sessionStorage.getItem('token');
  }

  private updateUserInformation(): void {
    if (this.currentToken) {

      const decodedToken = this.jwtService.decodeToken(this.currentToken);

      this.currentUser = new User();
      this.currentUser.emailAddress = decodedToken.email;
      if (decodedToken.admin){
        this.currentUser.role= Role.ADMIN;
      }
      // this.currentUser.admin = decodedToken.admin.toLowerCase() === 'true';
      // this.currentUser.exp = decodedToken.exp;

    } else {
      this.currentUser = null;
    }
  }

  refreshToken(): Observable<any> {

    const observable = this.http.post(`${environment.apiUrl}/auth/refresh-token`, {},
      { headers: new HttpHeaders({Authorization: this.currentToken}), observe: 'response'}).pipe(share());

    observable.subscribe(data => {

        let refreshedToken = data.headers.get('Authorization');

        if (refreshedToken == null) {
          throw new Error('token was not present in the response');
        }

        refreshedToken = refreshedToken.replace('Bearer ', '');

        sessionStorage.setItem('token', refreshedToken);

        this.updateUserInformation();
      },
      (err) => {
        this.logOut();
      });

    return observable;
  }

  isUserLoggedIn() {
    return !!sessionStorage.getItem('userId');
  }

  logOut() {
    sessionStorage.removeItem('token')
  }

  // adminIsLoggedIn(){
  //   return !!sessionStorage.getItem('adminId')
  // }


}
