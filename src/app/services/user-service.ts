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

  private currentUser: User | null = null;

  constructor() {
    this.loadUser();
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  loadUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

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

  async getUserByEmail(email: string) {
    return firstValueFrom(
      this.httpClient.get<User>(`${this.url}/byEmail/${email}`)
    );
  }

  setUser(user: User) {
    this.selectedUser.set(user);
  }

  clearUser() {
    this.selectedUser.set(null);
  }
}
