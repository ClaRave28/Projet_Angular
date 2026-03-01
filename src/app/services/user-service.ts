import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../models/movie';
import {firstValueFrom} from 'rxjs';
import {User} from '../models/User';

@Injectable({providedIn: 'root',})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  readonly url = "http://localhost:8080/users"

  async addUser(user: User): Promise<Movie> {
    return firstValueFrom(this.httpClient.post<Movie>(this.url, user));
  }
}
