import { Component, inject, input } from '@angular/core';
import { Drink } from '../../interfaces/cocktails.interface';
import { CocktailsService } from '../../services/cocktails.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cocktail-card.component.html',
})
export class CocktailCardComponent {
  drink = input.required<Drink | null>();
}
