import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule} from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { MenuComponent } from './components/mainpage/menu/menu.component';
import { ResultsComponent } from './components/mainpage/results/results.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotesNavbarComponent } from './components/notes-navbar/notes-navbar.component';
import { ShareNotesComponent } from './components/share-notes/share-notes.component';
import { SensorComponent } from './components/mainpage/sensor/sensor.component';
import { LoginComponent } from './components/mainpage/login/login.component';
import { RegisterComponent } from './components/mainpage/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ErrorComponent,
    MenuComponent,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
