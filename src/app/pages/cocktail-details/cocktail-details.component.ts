import { Component, computed, inject, input, signal, effect, OnInit } from '@angular/core';
import { Drink } from '../../interfaces/cocktails.interface';
import { CocktailsService } from '../../services/cocktails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [],
  templateUrl: './cocktail-details.component.html',
})
export class CocktailDetailsComponent implements OnInit {
  private cocktailsService = inject(CocktailsService);
  private route = inject(ActivatedRoute);
  cocktail = input.required<Drink | null>();
  drink = signal<Drink | null>(null);
  videoUrl = signal<string | null>(null);

  private _videoEffect = effect(() => {
    const name = this.drink()?.strDrink;
    if (!name) {
      this.videoUrl.set(null);
      return;
    }
    this.cocktailsService.getVideoId(name).subscribe(res => {
      const videoId = res.items?.[0]?.id?.videoId;
      if (videoId) {
        this.videoUrl.set(`https://www.youtube.com/watch?v=${videoId}`);
      } else {
        this.videoUrl.set(null);
      }
    });
  });

  ingredients = computed(() => {
    const c = this.drink();
    if (!c) return [];
    const result: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = c[`strIngredient${i}` as keyof Drink];
      const measure = c[`strMeasure${i}` as keyof Drink];
      if (ingredient) {
        result.push({ ingredient, measure });
      }
    }
    return result;
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.cocktailsService.getDrinkById(id).subscribe(res => {
        this.drink.set(res.drinks[0]);
      });
    });
  }
}
