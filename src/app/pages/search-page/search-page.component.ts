import { Component, inject } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [],
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  private cocktailsService = inject(CocktailsService);
  

}
