import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CocktailsService } from '../../services/cocktails.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private cocktailsService = inject(CocktailsService);
  categories = signal<string[]>([]);
  preferences: string[] = ['Alcoholic', 'Non alcoholic'];
  showCategories = false;

  ngOnInit() {
    const exclude = ['Punch / Party Drink', 'Other / Unknown', 'Coffee / Tea'];
    this.cocktailsService.getDrinkCategories().subscribe(res => {
      this.categories.set(res.drinks.filter(c => !exclude.includes(c.strCategory)).map(c => c.strCategory));
    })
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.categories-dropdown')) {
      this.showCategories = false;
    }
  }

}
