import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DrinksResponse } from '../interfaces/cocktails.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  private http = inject(HttpClient);

  getRandomCocktail() {
    return this.http.get<DrinksResponse>(`${API_URL}/random.php`);
  }
}
