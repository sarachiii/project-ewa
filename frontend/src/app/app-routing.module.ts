import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewNotesComponent} from "./notes/view-notes/view-notes.component";
import {ShareNotesComponent} from "./notes/share-notes/share-notes.component";


const routes: Routes = [
  {
    path: 'notes/view-notes', component: ViewNotesComponent, children: [
      {
        path: '',
        component: ShareNotesComponent
      },
      { path: '-', redirectTo: 'notes/view-notes', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
