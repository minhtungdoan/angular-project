import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor() {}

  router = inject(Router);
  canActivate(): boolean {
    const isLogin = sessionStorage.getItem('token') !== null;
    if (isLogin) {
      return true;
    } else {
      this.router.navigate(['/login-admin']);
      return false;
    }
  }
}
