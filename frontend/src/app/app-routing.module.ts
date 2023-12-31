import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from "./components/error/error.component";
import { HomeComponent } from "./components/mainpage/home/home.component";
import { LoginComponent } from './components/mainpage/login/login.component';
import { NotesNavbarComponent } from "./components/notes-navbar/notes-navbar.component";
import { NotesComponent } from "./components/notes/notes.component";
import { ShareNotesComponent } from "./components/share-notes/share-notes.component";
import { SensorComponent} from "./components/mainpage/sensor/sensor.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { AccountComponent } from "./components/settings/account/account.component";
import { PreferencesComponent } from "./components/settings/preferences/preferences.component";
import { AuthGuardService } from "./services/auth-guard.service";
import {TeamsComponent} from "./components/teams/teams.component";
import {ViewTeamsComponent} from "./components/teams/view-teams/view-teams.component";
import {AddUserComponent} from "./components/teams/add-user/add-user.component";
import {AdminGuard} from "./services/guards/admin.guard";
import {MyTeamComponent} from "./components/teams/my-team/my-team.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'sensors', component: SensorComponent, canActivate: [AuthGuardService] },
  { path: 'notes', component: NotesNavbarComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardService],
    children: [
      {
        path: ':specialty',
        component: NotesComponent,
        children: [
          { path: 'add', component: ShareNotesComponent }
        ]
      },
    ],
  },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'my-team', pathMatch: 'full' },
      { path: 'my-team', component: MyTeamComponent },
      { path: 'view', component: ViewTeamsComponent, canActivate: [AdminGuard]},
      { path: 'add-user', component: AddUserComponent, canActivate: [AdminGuard]}
    ]
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      { path: 'preferences', component: PreferencesComponent }
    ]
  },
  { path: '**', component: ErrorComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
