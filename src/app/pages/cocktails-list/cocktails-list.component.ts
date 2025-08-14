import { AfterViewInit, Component, ElementRef, inject, input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CocktailCardComponent } from "../../components/cocktail-card/cocktail-card.component";
import type { Drink } from '../../interfaces/cocktails.interface';
import { CocktailsService } from '../../services/cocktails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cocktails-list',
  standalone: true,
  imports: [CocktailCardComponent],
  templateUrl: './cocktails-list.component.html',
})
export class CocktailsListComponent implements OnInit, AfterViewInit, OnDestroy {
  private cocktailsService = inject(CocktailsService);
  private route = inject(ActivatedRoute);

  drinks = signal<Drink[]>([]);
  title = signal('');

  inputDrinks = input<Drink[] | null>();

  visibleDrinks = signal<Drink[]>([]);
  private step = 8;
  @ViewChild('sentinel') sentinel!: ElementRef;

  showScrollTop = signal(false);
  private scrollListener = () => this.showScrollTop.set(window.scrollY > 200);

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getDrinksByCategory(category: string) {
    this.cocktailsService.getDrinksByCategory(category).subscribe(res => {
      this.drinks.set(res.drinks);
      this.visibleDrinks.set(res.drinks.slice(0, this.step));
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.getDrinksByCategory(category);
        this.title.set(category+'s');
      }
    });
    if (this.inputDrinks()) {
      this.drinks.set(this.inputDrinks()!);
      this.visibleDrinks.set(this.inputDrinks()!.slice(0, this.step));
    }
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.scrollListener);

    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        this.loadMore();
      }
    });

    if (this.sentinel?.nativeElement) {
      observer.observe(this.sentinel.nativeElement);
    }
  }

  loadMore() {
    const current = this.visibleDrinks();
    const all = this.drinks();
    const next = all.slice(current.length, current.length + this.step);
    this.visibleDrinks.set([...current, ...next]);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }
}
