import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  LoginForm,
  LoginFormResponse,
  RegisterForm,
  User,
} from '../types/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  constructor() {}

  getUserList() {
    return this.http.get<User[]>('https://angular-project-api.vercel.app/auth');
  }

  login(user: LoginForm) {
    return this.http.post<LoginFormResponse>(
      'https://angular-project-api.vercel.app/auth/login',
      user
    );
  }

  register(user: RegisterForm) {
    return this.http.post<RegisterForm>(
      'https://angular-project-api.vercel.app/auth/register',
      user
    );
  }

  searchUser(query: string) {
    return this.http.get<User[]>(
      `https://angular-project-api.vercel.app/search?query=${query}`
    );
  }

  autocomplete(query: string) {
    return this.http.get<User[]>(
      `https://angular-project-api.vercel.app/autocomplete?query=${query}`
    );
  }
}
