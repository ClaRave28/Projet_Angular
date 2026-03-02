import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MoviesList } from './movies-list/movies-list';
import {AddMovie} from './add-movie/add-movie';
import {SignIn} from './sign-in/sign-in';
import {UsersList} from './users-list/users-list';
import {UserReviews} from './user-reviews/user-reviews';

import { FilmsVus } from './films-vus/films-vus';

export const routes: Routes = [

    { path: '', component: Home},
    { path: 'movies', component: MoviesList},
    { path : 'add-movie', component: AddMovie},
    { path: 'sign-in', component: SignIn},
    { path: 'users', component: UsersList},
    { path: "users/reviews", component: UserReviews },
    {path: 'add-movie/:id', component: AddMovie},
    {path: 'films-vus', component: FilmsVus}

];
