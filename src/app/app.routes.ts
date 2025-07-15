import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full'
  },
  {
    path: 'cocktails/:category',
    loadComponent: () => import('./pages/cocktails-list/cocktails-list.component').then((m) => m.CocktailsListComponent)
  },
  {
    path: 'cocktails/:id',
    loadComponent: () => import('./pages/cocktail-details/cocktail-details.component').then((m) => m.CocktailDetailsComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search-page/search-page.component').then((m) => m.SearchPageComponent)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites-list/favorites-list.component').then((m) => m.FavoritesListComponent)
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
