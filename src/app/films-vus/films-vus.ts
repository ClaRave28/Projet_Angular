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
  this.ratingTempScena = movie.userRateScena || 0;
  this.ratingTempActeurs = movie.userRateActeurs || 0;
  this.ratingTempDecors = movie.userRateDecors || 0;


}

// Note globale ------------------------------------

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
  ratingTempScena: number = 0;
  ratingTempActeurs: number = 0;
  ratingTempDecors: number = 0;

  // fonction save pour sauvegarder la popup

save() {
  if(this.selectedMovie){
    this.selectedMovie.userRate = this.ratingTemp;
    this.selectedMovie.comment = this.commentTemp;
    this.selectedMovie.userRateScena = this.ratingTempScena;
    this.selectedMovie.userRateActeurs = this.ratingTempActeurs;
    this.selectedMovie.userRateDecors = this.ratingTempDecors;
  }
    console.log("Sauvegardé !");
  }

  // Notes du scénario------------------------------------

  rateScena(value: number) {
    
    if (this.ratingTempScena === value) {
      this.ratingTempScena = value - 1;
    } else {
      this.ratingTempScena = value;
    }
    
  }

  // Notes jeu d'acteurs------------------------------------

  rateActeurs(value: number) {
    
    if (this.ratingTempActeurs === value) {
      this.ratingTempActeurs = value - 1;
    } else {
      this.ratingTempActeurs = value;
    }
    
  }
  // Notes décors------------------------------------

   rateDecors(value: number) {
    
    if (this.ratingTempDecors === value) {
      this.ratingTempDecors = value - 1;
    } else {
      this.ratingTempDecors = value;
    }
    
  }





}

 
  



