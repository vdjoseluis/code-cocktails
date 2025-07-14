import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'cocktails',
    loadComponent: () => import('./pages/cocktails-list/cocktails-list.component').then((m) => m.CocktailsListComponent)
  },
  {
    path: 'cocktails/:id',
    loadComponent: () => import('./pages/cocktail-details/cocktail-details.component').then((m) => m.CocktailDetailsComponent)
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
