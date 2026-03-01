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
