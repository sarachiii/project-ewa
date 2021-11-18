import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {WebStorageService} from "../../../services/storage/web-storage.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(protected webStorageService: WebStorageService) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.webStorageService.has('userId');
  }

  logOut(): void {
    this.webStorageService.clear();
  }

}
