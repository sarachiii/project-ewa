import { Injectable } from '@angular/core';
import {HttpClient}from'@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(protected http :HttpClient) {
  }

  authenticate(username : String, password:String) :Promise<number|void> {

    const request = this.http.post<number>(environment.apiUrl+"/login",{username:username,password:password}).toPromise().catch(error=>{
      console.log(error.error)
    })
    return Promise.resolve(request);
  }

  isUserLoggedIn() {
    return !!sessionStorage.getItem('userId');
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

  adminIsLoggedIn(){
    return !!sessionStorage.getItem('adminId')
  }



}
