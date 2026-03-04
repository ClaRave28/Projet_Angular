import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe, JsonPipe, SlicePipe } from '@angular/common';
import { MoviesList } from '../movies-list/movies-list';
import { MoviesApi } from '../services/movies-api';
import { Historique } from '../historique/historique';
import { FormsModule } from '@angular/forms';
import { Review, ReviewRequest } from '../models/review';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user-service';


@Component({
  selector: 'app-films-vus',
  imports: [AsyncPipe, MoviesList, SlicePipe, JsonPipe, Historique, CommonModule, FormsModule],
  templateUrl: './films-vus.html',
  styleUrls: ['./films-vus.scss'],
})
export class FilmsVus implements OnInit {

  private readonly userService = inject(UserService);
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
    this.noteglobale = movie.noteMoyenne || 0;



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

  noteglobale: number = 0;
  noteMoyenne: number = 0;


  currentUser: any;

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser?.id) {
      this.userService.getUserReviews(this.currentUser.id).then(reviews => {
        this.movies$ = this.movies$.pipe(
          map(movies => movies.map(movie => {
            const review = reviews.find((r: any) => r.movie.id === movie.id);
            if (review) {
              movie.hasRated = true;
              movie.noteMoyenne = review.rate;
              movie.comment = review.text;
            }
            return movie;
          }))
        );
      });
    }
  }





  save() {
    if (this.selectedMovie) {
      this.selectedMovie.userRate = this.ratingTemp;
      this.selectedMovie.comment = this.commentTemp;
      this.selectedMovie.userRateScena = this.ratingTempScena;
      this.selectedMovie.userRateActeurs = this.ratingTempActeurs;
      this.selectedMovie.userRateDecors = this.ratingTempDecors;
      this.noteglobale = this.moyenne(this.ratingTemp, this.ratingTempActeurs, this.ratingTempDecors, this.ratingTempScena)
      this.selectedMovie.noteMoyenne = this.noteglobale;
      this.selectedMovie.hasRated = this.noteglobale > 0;


      const review = {
        user: { id: this.currentUser.id },
        movie: { id: this.selectedMovie.id },
        rate: this.moyenne(
          this.ratingTempScena,
          this.ratingTempActeurs,
          this.ratingTempDecors,
          this.ratingTemp
        ),
        text: this.commentTemp
      };

      this.moviesApi.addReview(review).subscribe({
        next: () => console.log("Review saved ✅"),
        error: err => {
          console.error("Review save error ❌", err)
          console.error("Error details:", err.error);
        }
      });
    }

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

  // fonction moyenne


  moyenne(noteGlobale: number, noteDecors: number, noteActeur: number, noteScena: number) {

    return Math.round((noteGlobale + noteDecors + noteActeur + noteScena) / 4)
  }

}






