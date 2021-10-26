import { Injectable } from '@angular/core';
import {Workfield} from "../models/workfield";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public workfields: Workfield[] = [];

  constructor() { }

  public findAll(): Workfield[]{
    return this.workfields;
  }

  public findByName(name: string): Workfield | null {
    return this.workfields.find(field => field.name === name) || null;
  }
}
