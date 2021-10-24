import { Injectable } from '@angular/core';
import {Field} from "../models/field";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public fields: Field[] = [];

  constructor() { }

  public findAll(): Field[]{
    return this.fields;
  }

  public findByName(name: string): Field | null {
    return this.fields.find(field => field.name === name) || null;
  }
}
