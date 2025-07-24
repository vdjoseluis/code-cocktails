import { Component, effect, inject, signal } from '@angular/core';
import { CocktailCardComponent } from '../../components/cocktail-card/cocktail-card.component';
import type { Drink } from '../../interfaces/cocktails.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CocktailCardComponent],
  templateUrl: './favorites-list.component.html',
})
export class FavoritesListComponent {
  favService = inject(FavoritesService);
}
