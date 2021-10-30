import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ResultsComponent } from './components/mainpage/results/results.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotesNavbarComponent } from './components/notes-navbar/notes-navbar.component';
import { ShareNotesComponent } from './components/share-notes/share-notes.component';
import { SensorComponent } from './components/mainpage/sensor/sensor.component';
import { LoginComponent } from './components/mainpage/login/login.component';
import { RegisterComponent } from './components/mainpage/register/register.component';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { NgxMasonryModule } from "ngx-masonry";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ErrorComponent,
    ResultsComponent,
    NotesComponent,
    NotesNavbarComponent,
    ShareNotesComponent,
    SensorComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    NgxMasonryModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
