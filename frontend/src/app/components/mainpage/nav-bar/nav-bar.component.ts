import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WebStorageService} from "../../../services/storage/web-storage.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
import {NotesService} from "../../../services/notes.service";

/**
 * This is the navbar component.
 *
 * @author Hashim Mohammad and Sarah Chrzanowska-Buth
 */

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  user: User | null;

  private _screenHeight: number;
  private _screenWidth: number;

  @ViewChild('mobileMenu') mobileMenu: ElementRef;

  constructor(private elementRef: ElementRef,
              private webStorageService: WebStorageService,
              private userService: UserService) {
    this.user = null;
    this._screenHeight = window.innerHeight;
    this._screenWidth = window.innerWidth;
  }


  get screenHeight(): number {
    return this._screenHeight;
  }

  get screenWidth(): number {
    return this._screenWidth;
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.loggedUser$.subscribe(value => {
      this.user = value;
    })
    if (this.isLoggedIn()) {
      // Set logged-in user in the UserService;
      this.userService.updateLoggedUser(this.webStorageService.getUserId())
    }
  }

  ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }

  isLoggedIn(): boolean {
    return this.webStorageService.has('userId');
  }

  logOut(): void {
    this.webStorageService.clear();
  }

  handleImageError(event: Event): void {
    (<HTMLImageElement>event.target).src = "assets/images/default_avatar.svg";
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event: Event): void {
    this._screenHeight = window.innerHeight;
    this._screenWidth = window.innerWidth;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    // If the component doesn't contain the target, click event occurred outside the component
    if (!this.elementRef.nativeElement.contains(event.target)) this.closeMobileMenu();
  }

  closeMobileMenu(): void {
    let button: HTMLButtonElement = this.mobileMenu?.nativeElement as HTMLButtonElement;
    if (this.screenWidth < 992) this.closeMenu(button);
  }

  closeMenu(toggle: HTMLElement) {
    if (toggle?.getAttribute('aria-expanded') == 'true') toggle.click();
  }

}
