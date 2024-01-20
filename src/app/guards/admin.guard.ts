import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token');

  if (token) {
    return true;
  }
  router.navigate(['/login-admin']);
  return false;
};
