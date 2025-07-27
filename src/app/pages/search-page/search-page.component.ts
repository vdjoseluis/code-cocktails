import { Component, inject, signal } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import type { DrinksResponse } from '../../interfaces/cocktails.interface';
import { CommonModule } from '@angular/common';
import { CocktailsListComponent } from "../cocktails-list/cocktails-list.component";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, CocktailsListComponent],
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  private cocktailService = inject(CocktailsService);
  drinks = signal<DrinksResponse>({ drinks: [] });
  viewList = signal(false);

  search(query: string) {
    this.viewList.set(false);
    this.clearSearch();
    this.cocktailService.getDrinksByName(query).subscribe((response) => {
      this.drinks.set(response);
    });
  }

  clearSearch() {
    this.drinks.set({ drinks: [] });
  }

  showList() {
    this.viewList.set(true);
  }


}
