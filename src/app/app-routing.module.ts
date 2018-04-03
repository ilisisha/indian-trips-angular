import { Routes } from '@angular/router';
import { DistanceComponent } from './components/distance/distance.component';
import { PopularComponent } from './components/popular/popular.component';
import { ExploreComponent } from './components/explore/explore.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/distance',
    pathMatch: 'full'
  },
  {
    path: 'distance',
    component: DistanceComponent
  },
  {
    path: 'popular',
    component: PopularComponent
  },
  {
    path: 'explore',
    component: ExploreComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '/distance' }
];
