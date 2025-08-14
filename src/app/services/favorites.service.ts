import { computed, Injectable, signal } from '@angular/core';
import type { Drink } from '../interfaces/cocktails.interface';
import { filter, from, fromEvent, pipe } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private load(): Drink[] {
    return JSON.parse(localStorage.getItem('favoriteDrinks') || '[]');
  }

  private _favorites = signal<Drink[]>(this.load());
  readonly favorites = computed(() => this._favorites());

  private save(list: Drink[]) {
    localStorage.setItem('favoriteDrinks', JSON.stringify(list));
  }

  remove(id: string) {
    this._favorites.update(list => {
      const updated = list.filter(d => d.idDrink !== id);
      this.save(updated);
      return updated;
    });
  }

  add(drink: Drink) {
    this._favorites.update(list => {
      if (!list.some(d => d.idDrink === drink.idDrink)) {
        const updated = [...list, drink];
        this.save(updated);
        return updated;
      }
      return list;
    });
  }

  constructor() {
    fromEvent<StorageEvent>(window, 'storage')
      .pipe(filter(event => event.key === 'favoriteDrinks'))
      .subscribe(() => this._favorites.set(this.load()));
  }
}
