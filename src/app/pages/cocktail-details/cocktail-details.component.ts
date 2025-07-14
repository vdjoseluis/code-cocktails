import { Component, computed, input } from '@angular/core';
import { Drink } from '../../interfaces/cocktails.interface';

@Component({
  selector: 'app-cocktail-details',
  imports: [],
  templateUrl: './cocktail-details.component.html',
  styles: ``
})
export class CocktailDetailsComponent {
  cocktail = input.required<Drink | null>();

  ingredients = computed(() => {
    const c = this.cocktail();
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


}
