import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../models/movie';
import { MoviesApi } from '../services/movies-api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone : true,
  selector: 'app-add-movie',
  imports: [FormsModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.scss',
})
export class AddMovie implements OnInit {

  private readonly moviesApi = inject(MoviesApi);
  private readonly router = inject(Router);
   private readonly route = inject(ActivatedRoute);
  private readonly httpClient = inject(HttpClient);
  readonly url = "http://localhost:8080/movies"


  movie: Movie = {
    title: '',
    director: '',
    // releaseDate:                   new Date(),
    releaseDate : '',
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  }

  

   addMovie(): void {
    this.moviesApi.addMovie(this.movie).subscribe(
        () => this.router.navigate(['/movies'])
    );
 }

 ngOnInit() {

  const id = Number(this.route.snapshot.paramMap.get('id'));

  if (id) {

    this.moviesApi.getMovieById(id).subscribe(movie => {

      this.movie = {
        ...movie,
        releaseDate: new Date(movie.releaseDate as string)
          .toISOString()
          .split('T')[0]
      };

    });

  }

}

saveMovie() {

  if (this.movie.id) {
    // UPDATE
    this.moviesApi.updateMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });

  } else {
    // CREATE
    this.moviesApi.addMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }

}

 




}
