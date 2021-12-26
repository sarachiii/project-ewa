import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { NgxMasonryModule } from "ngx-masonry";
import { AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotesNavbarComponent } from './components/notes-navbar/notes-navbar.component';
import { ShareNotesComponent } from './components/share-notes/share-notes.component';
import { SensorComponent } from './components/mainpage/sensor/sensor.component';
import { LoginComponent } from './components/mainpage/login/login.component';
import { RegisterComponent } from './components/mainpage/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountComponent } from './components/settings/account/account.component';
import { PreferencesComponent } from './components/settings/preferences/preferences.component';
import { DatePipe } from "@angular/common";
import { SimpleNotificationsModule } from "angular2-notifications";
import { EditNotesComponent } from './components/edit-notes/edit-notes.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ViewTeamsComponent } from './components/teams/view-teams/view-teams.component';
import { TeamComponent } from './components/teams/view-teams/team/team.component';
import { HistoryDataComponent } from './components/mainpage/home/history-data/history-data.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ErrorComponent,
    NotesComponent,
    NotesNavbarComponent,
    ShareNotesComponent,
    SensorComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    AccountComponent,
    PreferencesComponent,
    EditNotesComponent,
    TeamsComponent,
    ViewTeamsComponent,
    TeamComponent,
    HistoryDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxMasonryModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
