import { Component, inject } from '@angular/core';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';
import { MoviesApi } from '../services/movies-api';
import { RouterLink } from '@angular/router';

import {ToastrService} from 'ngx-toastr';

@Component({
  standalone : true,
  selector: 'app-movies-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './movies-list.html',
  styleUrls: ['./movies-list.scss'],

})
export class MoviesList {

private readonly moviesApi = inject(MoviesApi);
 movies$ = this.moviesApi.getMovies();

constructor(private toastr: ToastrService,) {
}

  deleteMovie(movie: Movie) {
    const confirmed = confirm(`Voulez-vous vraiment supprimer "${movie.title}" ?`);

    if (confirmed && movie.id !== undefined) {
      this.moviesApi.deleteMovie(movie.id).subscribe(() => {
        this.movies$ = this.moviesApi.getMovies();
        this.toastr.success('Film supprimé');
      });
    }
  }
}
