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

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ErrorComponent,
    MenuComponent,
    NotesComponent,
    NotesNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
