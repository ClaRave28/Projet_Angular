import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {User} from '../models/User';
import {Review} from '../models/review';

@Injectable({providedIn: 'root',})
export class UserService {

  selectedUser = signal<User | null>(null);


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

  async updateUser(updatedUser: User): Promise<User> {
    return firstValueFrom(
      this.httpClient.put<User>(`${this.url}/${updatedUser.id}`, updatedUser)
    );
  }

  async getUserReviews(userId: number) {
    return firstValueFrom(
      this.httpClient.get<Review[]>(`${this.url}/${userId}/reviews`)
    );
  }

  async getUser(userId: number) {
    return firstValueFrom(
      this.httpClient.get<User>(`${this.url}/${userId}`)
    );
  }

  setUser(user: User) {
    this.selectedUser.set(user);
  }

  clearUser() {
    this.selectedUser.set(null);
  }
}
