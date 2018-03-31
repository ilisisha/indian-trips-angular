import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/content', pathMatch: 'full'},
  {
    path: 'content',

  },
  {
    path: 'cards',
  },
  {
    path: 'detail/:id',
  },
  {
    path: 'filter-editor',
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
