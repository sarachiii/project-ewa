import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { MenuComponent } from './components/mainpage/menu/menu.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotesNavbarComponent } from './components/notes-navbar/notes-navbar.component';
import { ShareNotesComponent } from './components/share-notes/share-notes.component';
import { ViewNotesComponent } from './notes/view-notes/view-notes.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ErrorComponent,
    MenuComponent,
    NotesComponent,
    NotesNavbarComponent,
    ShareNotesComponent,
    ViewNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
