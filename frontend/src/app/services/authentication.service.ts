import { Injectable } from '@angular/core';
import {HttpClient}from'@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(protected http :HttpClient) {
  }

  authenticate(username : String, password:String) :Promise<boolean|void> {

    const request = this.http.post<boolean>(environment.hostUrl+"/login",{username:username,password:password}).toPromise().catch(error=>{
      console.log(error.error)
    })
    return Promise.resolve(request);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }



}
