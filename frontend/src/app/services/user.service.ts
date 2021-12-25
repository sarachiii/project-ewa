import { Injectable } from '@angular/core';
import { CRUDService } from "./interfaces/crud.service";
import { User } from "../models/user";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { shareReplay } from "rxjs/operators";

// TODO: Maybe find a way to separate User Storage and Service
@Injectable({
  providedIn: 'root'
})
export class UserService implements CRUDService<User> {
  protected resourceUrl: URL;
  protected users: User[];
  private _loggedUser$: BehaviorSubject<User>;

  constructor(protected httpClient: HttpClient) {
    this.resourceUrl = new URL(environment.apiUrl);
    this.users = [];
    this._loggedUser$ = new BehaviorSubject<User>(<User>{});
    // Temporarily used as logged in user
   /* this.users.push(new User(1,0, Role.ADMIN, "Botanist", "Sjors", "Peters",
      "sjors.peters@climatecleanup.org", "user",
      "https://yt3.ggpht.com/fAfB4LQvATPHhF9ou35zv5FZmXVhMtGnW_vZQNpyd_Krkzasu48k53I3UTIxcqNyMioqK4PR0w=s900-c-k-c0x00ffffff-no-rj"));*/
    // localStorage.setItem('userId', this.users[0].id.toString())
  }

  get loggedUser$(): Observable<User> {
    return this._loggedUser$.asObservable();
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User | null {
    return this.users.find(user => user.id == id);
  }

  save(user: User): Promise<User> | User | null {
    // For now just push to the list or update list item
    let index: number = this.users.findIndex(u => u.id === user.id);
    if (index > -1) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }
    // Return the saved user
    return user;
  }

  deleteById(id: number): Promise<User> | User | null {
    let index: number = this.users.findIndex(user => user.id === id);
    let user = this.users[index];
    if (user) this.users.splice(index, 1);
    return user || null;
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(new URL('/users', this.resourceUrl).toString());
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(new URL(`/users?id=${id}`, this.resourceUrl).toString());
  }

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(new URL(`/users?username=${username}`, this.resourceUrl).toString());
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>(new URL(`/users`, this.resourceUrl).toString(), user);
  }

  updateLoggedUser(id: number) {
    this.getUserById(id).pipe(shareReplay(1)).toPromise().then(value => {
      this._loggedUser$.next(value);
    }).catch(reason => { console.log(reason); });
      /*.pipe(shareReplay(1)).subscribe(value => {
      this._loggedUser$.next(value);
      console.log(value)
    }, error => { console.log(error); });*/
  }

  // Temporary logged in user
  loggedInUser(): User | null {

    let id = parseInt(localStorage.getItem('userId'));
    return this.findById(id);
  }

  // TODO: Rest get users should use min and max, which will be provided outside a service maybe with a subject
}
