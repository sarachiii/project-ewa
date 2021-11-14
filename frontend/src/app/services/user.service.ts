import { Injectable } from '@angular/core';
import { CRUDService } from "./interfaces/crud.service";
import { Role, User } from "../models/user";

@Injectable()
export class UserService implements CRUDService<User> {
  protected users: User[]

  constructor() {
    this.users = [];
    // Temporarily used as logged in user
    this.users.push(new User(1,0, Role.ADMIN, "Botanist", "Sjors", "Peters",
      "sjors.peters@climatecleanup.org", "password1",
      "https://yt3.ggpht.com/fAfB4LQvATPHhF9ou35zv5FZmXVhMtGnW_vZQNpyd_Krkzasu48k53I3UTIxcqNyMioqK4PR0w=s900-c-k-c0x00ffffff-no-rj"));
    localStorage.setItem('userId', this.users[0].id.toString())
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

  // Temporary logged in user
  loggedInUser(): User | null {
    let id = parseInt(localStorage.getItem('userId'));
    return this.findById(id);
  }

  // TODO: Rest get users should use min and max, which will be provided outside a service maybe with a subject
}
