import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe, JsonPipe, SlicePipe } from '@angular/common';
import { MoviesList } from '../movies-list/movies-list';
import { MoviesApi } from '../services/movies-api';
import { Historique } from '../historique/historique';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-films-vus',
  imports: [AsyncPipe, MoviesList, SlicePipe, JsonPipe, Historique, CommonModule, FormsModule],
  templateUrl: './films-vus.html',
  styleUrls: ['./films-vus.scss'],
})
export class FilmsVus {

  private readonly moviesApi = inject(MoviesApi);
  movies$ = this.moviesApi.getMovies();

  selectedMovie: any = null;

  selectMovie(movie: any) {
  this.selectedMovie = movie;

  this.ratingTemp = movie.userRate || 0;
  this.commentTemp = movie.comment || '';
}

  
  rate(value: number) {
    
    if (this.ratingTemp === value) {
      this.ratingTemp = value - 1;
    } else {
      this.ratingTemp = value;
    }
    
  }

  ratingTemp: number = 0;
  commentTemp: string = '';
  comment: string = '';

 

save() {
  if(this.selectedMovie){
    this.selectedMovie.userRate = this.ratingTemp;
    this.selectedMovie.comment = this.commentTemp;
  }
    console.log("Sauvegardé !");
  }

}

 
  



