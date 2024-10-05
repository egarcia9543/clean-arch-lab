import { Routes } from '@angular/router';
import { CharactersComponent } from './ui/pages/characters/characters.component';

export const routes: Routes = [
  {
    path: '',
    component: CharactersComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
