import { Component, computed, inject, input, signal, effect } from '@angular/core';
import { Drink } from '../../interfaces/cocktails.interface';
import { CocktailsService } from '../../services/cocktails.service';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [],
  templateUrl: './cocktail-details.component.html',
})
export class CocktailDetailsComponent {
  private cocktailsService = inject(CocktailsService);
  cocktail = input.required<Drink | null>();
  videoUrl = signal<string | null>(null);

  // Mueve el effect aquí, en el cuerpo de la clase
  private _videoEffect = effect(() => {
    const name = this.cocktail()?.strDrink;
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
