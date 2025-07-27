import { Component, effect, inject, signal } from '@angular/core';
import { CocktailCardComponent } from '../../components/cocktail-card/cocktail-card.component';
import type { Drink } from '../../interfaces/cocktails.interface';
import { FavoritesService } from '../../services/favorites.service';
import { CocktailsListComponent } from "../cocktails-list/cocktails-list.component";

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CocktailCardComponent, CocktailsListComponent],
  templateUrl: './favorites-list.component.html',
})
export class FavoritesListComponent {
  favService = inject(FavoritesService);
}
