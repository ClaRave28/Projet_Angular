import { Component, inject } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { AsyncPipe, DatePipe, JsonPipe, NgIf, SlicePipe } from '@angular/common';
import { MovieCard } from './movie-card/movie-card';
import { MoviesList } from '../movies-list/movies-list';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

export type SortOption = 'rate' | 'date' | 'alpha';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, MovieCard, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private readonly moviesApi = inject(MoviesApi);

  readonly moviesPerSlide = 4;

  readonly sortOptions: { value: SortOption; label: string }[] = [
    { value: 'rate',  label: '⭐ Mieux notés'        },
    { value: 'date',  label: '🗓️ Plus récents'        },
    { value: 'alpha', label: '🔤 Ordre alphabétique'  },
  ];

  private readonly sort$ = new BehaviorSubject<SortOption>('rate');

  get selectedSort() { return this.sort$.value; }

  movies$ = this.moviesApi.getMovies();

  sortedMovies$ = combineLatest([this.movies$, this.sort$]).pipe(
    map(([movies, sort]) => this.sortMovies(movies, sort))
  );

  onSortChange(value: string) {
    this.sort$.next(value as SortOption);
  }

  private sortMovies(movies: Movie[], sort: SortOption): Movie[] {
    const copy = [...movies];
    switch (sort) {
      case 'rate':
        return copy.sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));
      case 'date':
        return copy.sort((a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      case 'alpha':
        return copy.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  getSlides(movies: Movie[]): Movie[][] {
    const slides: Movie[][] = [];
    for (let i = 0; i < movies.length; i += this.moviesPerSlide) {
      slides.push(movies.slice(i, i + this.moviesPerSlide));
    }
    return slides;
  }
}
