import { Component, inject, OnInit, signal } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { Drink } from '../../interfaces/cocktails.interface';
import { CocktailDetailsComponent } from "../cocktail-details/cocktail-details.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CocktailDetailsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private cocktailsService = inject(CocktailsService);
  cocktail = signal<Drink | null>(null);

  ngOnInit(): void {
    this.getRandomCocktail();
  }

  getRandomCocktail() {
    this.cocktailsService.getRandomCocktail().subscribe((data) => {
      if (data.drinks && data.drinks.length > 0) {
        this.cocktail.set(data.drinks[0]);
      } else {
        this.cocktail.set(null);
      }
    });
  }

}
