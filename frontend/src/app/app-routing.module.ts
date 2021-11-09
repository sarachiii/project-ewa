import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/mainpage/home/home.component";
import { ErrorComponent } from "./components/error/error.component";
import { ResultsComponent } from "./components/mainpage/results/results.component";
import { NotesNavbarComponent } from "./components/notes-navbar/notes-navbar.component";
import { NotesComponent } from "./components/notes/notes.component";
import { ShareNotesComponent } from "./components/share-notes/share-notes.component";
import { SensorComponent} from "./components/mainpage/sensor/sensor.component";
import { LoginComponent } from './components/mainpage/login/login.component';
import { SettingsComponent } from "./components/settings/settings.component";
import { AccountComponent } from "./components/settings/account/account.component";
import { PreferencesComponent } from "./components/settings/preferences/preferences.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: ResultsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sensors', component: SensorComponent },
  { path: 'notes', component: NotesNavbarComponent, children: [
      {
        path: ':field',
        component: NotesComponent,
        children: [
          { path: 'add', component: ShareNotesComponent }
        ]
      },
    ],
  },
  { path: 'settings', component: SettingsComponent, children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      { path: 'preferences', component: PreferencesComponent }
    ]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
