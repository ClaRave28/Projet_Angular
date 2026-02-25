import { Component, inject } from '@angular/core';
import { Movie } from '../models/movie';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesApi } from '../services/movies-api';
import { AsyncPipe, JsonPipe, SlicePipe } from '@angular/common';
import {AddMovie} from '../add-movie/add-movie';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  standalone : true,
  selector: 'app-movies-list',
  imports: [CommonModule, AddMovie, RouterLink],
  templateUrl: './movies-list.html',
  // styleUrl: './movies-list.scss',
  styleUrls: ['./movies-list.scss'],

})
export class MoviesList {

private readonly moviesApi = inject(MoviesApi);
 movies$ = this.moviesApi.getMovies();


deleteMovie(movie: Movie) {
    if (movie.id !== undefined) {
      this.moviesApi.deleteMovie(movie.id).subscribe(() => {
        this.movies$ = this.moviesApi.getMovies(); // refresh liste
      });
    }
  }
}
