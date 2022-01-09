import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {
  protected webStorage: Storage;
  protected rememberMe: boolean;

  constructor() {
    this.setStorage(localStorage.getItem("rememberMe") !== null)
  }

  getUserId() {
    return this.getAsNumber("userId");
  }

  setStorage(retainData: boolean) {
    if (retainData) {
      localStorage.setItem("rememberMe", "true");
      this.webStorage = localStorage;
    } else {
      localStorage.clear();
      this.webStorage = sessionStorage;
    }
  }

  set(key: string, value: string): void {
    this.webStorage.setItem(key, value);
  }

  get(key: string): string | null {
    return this.webStorage.getItem(key);
  }

  getAsNumber(key: string): number | null {
    return +this.get(key) || null;
  }

  getAsBoolean(key: string): boolean {
    return (/true|1/i).test(this.get(key));
  }

  has(key: string): boolean {
    return !!this.webStorage.getItem(key);
  }

  remove(key: string): void {
    this.webStorage.removeItem(key);
  }

  clear(): void {
    this.webStorage.clear();
  }
}
