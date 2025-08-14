import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
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
export class SearchPageComponent implements OnInit {
  private cocktailService = inject(CocktailsService);

  drinks = signal<DrinksResponse>({ drinks: [] });
  viewList = signal(false);

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  search(name: string) {
    this.viewList.set(false);
    this.cocktailService.getDrinksByName(name).subscribe((response) => {
      const drinksArray = response.drinks ?? [];
      this.drinks.set({ drinks: drinksArray });
      localStorage.setItem('foundDrinks', JSON.stringify(drinksArray));

      if (drinksArray.length === 0) {
        this.txtSearch.nativeElement.focus();
      }
    });

  }

  showList() {
    this.viewList.set(true);
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('foundDrinks');
    if (stored) {
      this.drinks.set({ drinks: JSON.parse(stored) });
      this.viewList.set(true);
    }
  }

}
