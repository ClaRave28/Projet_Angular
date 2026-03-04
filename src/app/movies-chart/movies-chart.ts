import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend, Filler } from 'chart.js';

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend, Filler);

@Component({
  selector: 'app-movies-chart',
  standalone: true,
  imports: [],
  templateUrl: './movies-chart.html',
  styleUrl: './movies-chart.scss',
})
export class MoviesChart implements OnInit {

  private readonly moviesApi = inject(MoviesApi);

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    this.moviesApi.getMovies().subscribe(movies => {
      const filtered = movies.filter(m => m.rate != null);

      new Chart(this.chartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: filtered.map(m => m.title),
          datasets: [{
            label: 'Note des films',
            data: filtered.map(m => m.rate ?? 0),
            borderColor: 'rgba(255, 193, 7, 1)',
            backgroundColor: 'rgba(255, 193, 7, 0.15)',
            pointBackgroundColor: 'rgba(255, 193, 7, 1)',
            pointRadius: 5,
            tension: 0.4,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: 'top' },
            tooltip: { mode: 'index', intersect: false },
          },
          scales: {
            y: {
              min: 0,
              max: 5,
              ticks: { stepSize: 1 },
              title: { display: true, text: 'Note (/5)' },
            },
            x: {
              title: { display: true, text: 'Films' },
            },
          },
        }
      });
    });
  }
}
