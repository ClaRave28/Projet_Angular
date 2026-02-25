import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MoviesList } from './movies-list/movies-list';
import { RouterLink } from '@angular/router';
import {AddMovie} from './add-movie/add-movie';

export const routes: Routes = [

    { path: '', component: Home},
    { path: 'movies', component: MoviesList},
    { path : 'add-movie', component: AddMovie},
    {path: 'add-movie/:id', component: AddMovie}

];
