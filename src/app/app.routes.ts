import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MoviesList } from './movies-list/movies-list';
import {AddMovie} from './add-movie/add-movie';
import {SignIn} from './sign-in/sign-in';

export const routes: Routes = [

    { path: '', component: Home},
    { path: 'movies', component: MoviesList},
    { path : 'add-movie', component: AddMovie},
    { path: 'add-movie/:id', component: AddMovie},
    { path: 'sign-in', component: SignIn},
];
