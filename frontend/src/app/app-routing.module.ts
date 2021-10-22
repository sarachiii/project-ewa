import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/mainpage/home/home.component";
import {MenuComponent} from "./components/mainpage/menu/menu.component";
import {ErrorComponent} from "./components/error/error.component";
import {ViewNotesComponent} from "./notes/view-notes/view-notes.component";
import {ShareNotesComponent} from "./notes/share-notes/share-notes.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {
    path: 'notes/add', component: ViewNotesComponent,
    children: [{path: '', component: ShareNotesComponent}],
  },
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
