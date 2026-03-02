import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historique',
  imports: [CommonModule],
  templateUrl: './historique.html',
  styleUrl: './historique.scss',
})
export class Historique {

  @Input({ required: true }) movie! : Movie;

}
