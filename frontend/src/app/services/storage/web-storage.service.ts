import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {
  protected rememberSession: BehaviorSubject<boolean>;
  protected webStorage: Storage;
  protected rememberMe: boolean;

  constructor() {
    this.rememberSession = new BehaviorSubject<boolean>(false);
    this.rememberSession.subscribe()
    this.setStorage(localStorage.getItem("rememberMe") !== null)
  }

  getUserId() {
    return this.webStorage.getItem("userId");
  }

  setStorage(rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      this.webStorage = localStorage;
    } else {
      localStorage.clear();
      this.webStorage = sessionStorage;
    }
  }

  clear(): void {
    this.webStorage.clear();
  }

  get(key: string): string | null {
    return this.webStorage.getItem(key);
  }

  set(key: string, value: string) {
    return this.webStorage.setItem(key, value);
  }

  has(key: string): boolean {
    return !!this.webStorage.getItem(key);
  }

  getAsNumber(key: string): number | null {
    return +this.get(key) || null;
  }

  getAsBoolean(key: string): boolean {
    return (/true|1/i).test(this.get(key));
  }
}
