import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss'],
  
})
export class MovieCard {

   @Input({ required: true }) movie! : Movie;

}
