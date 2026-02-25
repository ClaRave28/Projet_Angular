import { Component, inject } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, SlicePipe } from '@angular/common';
import { MovieCard } from './movie-card/movie-card';
import { MoviesList } from '../movies-list/movies-list';


@Component({
  selector: 'app-home',
  imports: [AsyncPipe, MovieCard, MoviesList,  SlicePipe, JsonPipe ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home  {

  private readonly moviesApi = inject(MoviesApi);
 movies$ = this.moviesApi.getMovies();

 



}
