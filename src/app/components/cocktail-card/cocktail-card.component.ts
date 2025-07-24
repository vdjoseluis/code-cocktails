import { Component, inject, input } from '@angular/core';
import { Drink } from '../../interfaces/cocktails.interface';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cocktail-card.component.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.9)' }),
        animate('1000ms ease-in-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ],
})
export class CocktailCardComponent {
  private favService = inject(FavoritesService);
  location = inject(Location);
  drink = input.required<Drink | null>();

  isFavoritePage() {
    return this.location.path() === '/favorites';
  }

  removeFavorite() {
    const id = this.drink()?.idDrink;
    if (id) this.favService.remove(id);
  }
}
