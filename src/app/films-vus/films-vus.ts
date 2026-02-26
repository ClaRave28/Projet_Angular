import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe, JsonPipe, SlicePipe } from '@angular/common';
import { MoviesList } from '../movies-list/movies-list';
import { MoviesApi } from '../services/movies-api';
import { Historique } from '../historique/historique';

@Component({
  selector: 'app-films-vus',
  imports: [AsyncPipe, MoviesList,  SlicePipe, JsonPipe, Historique],
  templateUrl: './films-vus.html',
  styleUrls: ['./films-vus.scss'],
})
export class FilmsVus {

   private readonly moviesApi = inject(MoviesApi);
 movies$ = this.moviesApi.getMovies();

 selectedMovie: any = null;

selectMovie(movie: any) {
  this.selectedMovie = movie;
}

}
