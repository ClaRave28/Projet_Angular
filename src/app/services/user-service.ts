import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {User} from '../models/User';

@Injectable({providedIn: 'root',})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  readonly url = "http://localhost:8080/users"

  async addUser(user: User): Promise<User> {
    return firstValueFrom(this.httpClient.post<User>(this.url, user));
  }

  async listUsers(): Promise<User[]> {
    return firstValueFrom(this.httpClient.get<User[]>(this.url));
  }

  async deleteUser(id: number) {
    return firstValueFrom(this.httpClient.delete(`${this.url}/${id}`));
  }
}
