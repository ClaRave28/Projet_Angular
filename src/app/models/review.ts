import {Movie} from './movie';
import {User} from './User';

export interface Review {
  id: number;
  user: User;
  movie: Movie;
  rate: number;
  text: string;
  reviewDate: Date;
}

export interface ReviewRequest {
  user: { id: number };
  movie: { id: number };
  rate: number;
  text: string;
}
