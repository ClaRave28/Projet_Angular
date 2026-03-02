import { Component, inject } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { OnInit } from '@angular/core';
import {AsyncPipe, DatePipe, JsonPipe, NgIf, SlicePipe} from '@angular/common';
import { MovieCard } from './movie-card/movie-card';
import { MoviesList } from '../movies-list/movies-list';


@Component({
  selector: 'app-home',
  imports: [AsyncPipe, MovieCard, MoviesList, SlicePipe, JsonPipe, DatePipe, NgIf,],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home  {

  private readonly moviesApi = inject(MoviesApi);
 movies$ = this.moviesApi.getMovies();

// Découpe la liste en groupes de 3 films (un groupe = un slide)
  getSlides(movies: Movie[], size = 3): Movie[][] {
    const slides: Movie[][] = [];
    for (let i = 0; i < movies.length; i += size) {
      slides.push(movies.slice(i, i + size));
    }
    return slides;
  }
}
