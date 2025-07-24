import { Component, computed, inject, input, signal, effect, OnInit } from '@angular/core';
import { Drink } from '../../interfaces/cocktails.interface';
import { CocktailsService } from '../../services/cocktails.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [],
  templateUrl: './cocktail-details.component.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.9)' }),
        animate('1000ms ease-in-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ],
})
export class CocktailDetailsComponent implements OnInit {
  private cocktailsService = inject(CocktailsService);
  private favService = inject(FavoritesService);
  private route = inject(ActivatedRoute);
  location = inject(Location);

  cocktailInput = input<Drink | null>();
  cocktailLoaded = signal<Drink | null>(null);
  readonly cocktail = computed(() => this.cocktailInput() ?? this.cocktailLoaded());
  videoUrl = signal<string | null>(null);

  isFavorite = signal(false);

  /* private _videoEffect = effect(() => {
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
  }); */

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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? this.route.snapshot.queryParamMap.get('id');
    if (id && !this.cocktailInput()) {
      this.cocktailsService.getDrinkById(id).subscribe(res => this.cocktailLoaded.set(res.drinks[0]));
    }
    if (localStorage.getItem('favoriteDrinks')) {
      const favoriteDrinks = JSON.parse(localStorage.getItem('favoriteDrinks') || '[]');
      this.isFavorite.set(favoriteDrinks.some((d: Drink) => d.idDrink === id));
    }
  }

  goBack() {
    this.location.back();
  }

  addToFavorite(drink: Drink | null) {
    if (!drink) return;
    this.favService.add(drink);
    this.isFavorite.set(true);
  }
}


