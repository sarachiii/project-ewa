import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/mainpage/home/home.component";
import { ErrorComponent } from "./components/error/error.component";
import {ResultsComponent} from "./components/mainpage/results/results.component";
import {NotesNavbarComponent} from "./components/notes-navbar/notes-navbar.component";
import {NotesComponent} from "./components/notes/notes.component";
import {ShareNotesComponent} from "./components/share-notes/share-notes.component";
import { SensorComponent} from "./components/mainpage/sensor/sensor.component";
import { LoginComponent } from './components/mainpage/login/login.component';
import { RegisterComponent } from './components/mainpage/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: ResultsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sensors', component: SensorComponent},
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
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
