import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DrinksResponse } from '../interfaces/cocktails.interface';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  private http = inject(HttpClient);

  private queryCacheDrinks = new Map<string, DrinksResponse>();

  getRandomCocktail() {
    return this.http.get<DrinksResponse>(`${API_URL}/random.php`);
  }

  getVideoId(name: string) {
    const query = `preparation+${encodeURIComponent(name)}+cocktail`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${API_KEY}`;
    return this.http.get<{ items: { id: { videoId: string } }[] }>(url);
  }

  getDrinkCategories() {
    return this.http.get<{ drinks: { strCategory: string }[] }>(`${API_URL}/list.php?c=list`);
  }

  getDrinksByCategory(category: string) {
    return this.http.get<DrinksResponse>(`${API_URL}/filter.php?c=${category}`);
  }

  getDrinkById(id: string) {
    return this.http.get<DrinksResponse>(`${API_URL}/lookup.php?i=${id}`);
  }

  getDrinksByName(name: string): Observable<DrinksResponse> {
    name = name.toLowerCase().trim();

    if (this.queryCacheDrinks.has(name)) {
      return of(this.queryCacheDrinks.get(name) ?? { drinks: [] });
    }

    return this.http.get<DrinksResponse>(`${API_URL}/search.php?s=${name}`)
      .pipe(tap(response => {
        this.queryCacheDrinks.set(name, response)

      }),
      catchError(() => throwError(() => new Error('Cocktail not found'))));
  }

}
