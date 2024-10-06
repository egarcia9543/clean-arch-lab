import { Routes } from '@angular/router';
import { CharactersComponent } from './ui/pages/characters/characters.component';
import { PlanetsComponent } from './ui/pages/planets/planets.component';

export const routes: Routes = [
  {
    path: '',
    component: CharactersComponent
  },
  {
    path: 'planets',
    component: PlanetsComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
