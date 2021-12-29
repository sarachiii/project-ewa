import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(){
    let Role = sessionStorage.getItem("userId")
    if (Role == "1"){
      return true;
    }
    else alert("Only other roles can see the sensor roles!")
    return false
  }

}
