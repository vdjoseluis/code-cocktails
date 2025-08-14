import { Component, inject } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CocktailCardComponent } from "../../components/cocktail-card/cocktail-card.component";

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CocktailCardComponent],
  templateUrl: './favorites-list.component.html',
})
export class FavoritesListComponent {
  favService = inject(FavoritesService);
}
