import { Component, inject, OnInit, signal } from '@angular/core';
import { CocktailCardComponent } from "../../components/cocktail-card/cocktail-card.component";
import { Drink } from '../../interfaces/cocktails.interface';
import { CocktailsService } from '../../services/cocktails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cocktails-list',
  standalone: true,
  imports: [CocktailCardComponent],
  templateUrl: './cocktails-list.component.html',
})
export class CocktailsListComponent implements OnInit {
  private cocktailsService = inject(CocktailsService);
  private route = inject(ActivatedRoute);
  drinks = signal<Drink[]>([]);

  getDrinksByCategory(category: string) {
    this.cocktailsService.getDrinksByCategory(category).subscribe(res => {
      this.drinks.set(res.drinks);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.getDrinksByCategory(category);
      }
    });
  }

}
