import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DrinksResponse } from '../interfaces/cocktails.interface';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  private http = inject(HttpClient);

  getRandomCocktail() {
    return this.http.get<DrinksResponse>(`${API_URL}/random.php`);
  }

  getVideoId(name: string) {
    const query = `preparation+${encodeURIComponent(name)}+cocktail`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${API_KEY}`;
    return this.http.get<{ items: { id: { videoId: string } }[] }>(url);
  }


}
