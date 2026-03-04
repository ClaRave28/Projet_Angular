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

  isConfirmOpen = false;
  confirmMessage = '';

  private confirmResolver!: (value: boolean) => void;
private readonly moviesApi = inject(MoviesApi);
 movies$ = this.moviesApi.getMovies();

constructor(private toastr: ToastrService,) {
}

  openConfirm(message: string): Promise<boolean> {
    this.confirmMessage = message;
    this.isConfirmOpen = true;

    return new Promise<boolean>((resolve) => {
      this.confirmResolver = resolve;
    });
  }
  confirm(result: boolean) {
    this.isConfirmOpen = false;
    this.confirmResolver(result);
  }

  async deleteMovie(movie: Movie) {
    const confirmed = await this.openConfirm('Voulez-vous vraiment supprimer ce film?');

    if (confirmed && movie.id !== undefined) {
      this.moviesApi.deleteMovie(movie.id).subscribe(() => {
        this.movies$ = this.moviesApi.getMovies();
        this.toastr.success('Film supprimé');
      });
    }
  }

}
