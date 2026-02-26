import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MoviesList } from './movies-list/movies-list';
import { RouterLink } from '@angular/router';
import {AddMovie} from './add-movie/add-movie';
import { FilmsVus } from './films-vus/films-vus';

export const routes: Routes = [

    { path: '', component: Home},
    { path: 'movies', component: MoviesList},
    { path : 'add-movie', component: AddMovie},
    {path: 'add-movie/:id', component: AddMovie},
    {path: 'films-vus', component: FilmsVus}

];
