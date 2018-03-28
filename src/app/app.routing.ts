import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: 'distance',
            controller: DestinationModal
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: '' }
];

export const routingComponents = [
  AppComponent
];

export const routing = RouterModule.forRoot(
  routes,
  { preloadingStrategy: PreloadAllModules },
);
