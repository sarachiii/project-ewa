import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { MenuComponent } from './components/mainpage/menu/menu.component';
import { ShareNotesComponent } from './notes/share-notes/share-notes.component';
import { ViewNotesComponent } from './notes/view-notes/view-notes.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ErrorComponent,
    MenuComponent,
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
