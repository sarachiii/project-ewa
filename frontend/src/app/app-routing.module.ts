import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/mainpage/home/home.component";
import { MenuComponent } from "./components/mainpage/menu/menu.component";
import { ErrorComponent } from "./components/error/error.component";
import { LoginComponent } from './components/mainpage/login/login.component';
import { RegisterComponent } from './components/mainpage/register/register.component';
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent ,canActivate:[AuthGuardService]},
  { path: 'menu', component: MenuComponent ,canActivate:[AuthGuardService]},
  { path: 'login', component: LoginComponent  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
