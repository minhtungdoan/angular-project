import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginForm, LoginFormResponse, RegisterForm } from '../types/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  constructor() {}

  login(user: LoginForm) {
    return this.http.post<LoginFormResponse>(
      'https://tungdm-angular-api.vercel.app/auth/login',
      user
    );
  }

  register(user: RegisterForm) {
    return this.http.post<RegisterForm>(
      'https://tungdm-angular-api.vercel.app/auth/register',
      user
    );
  }
}
