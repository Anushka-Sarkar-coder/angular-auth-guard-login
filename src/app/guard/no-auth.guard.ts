import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  const loggedIn = auth.isLoggedIn();

  // If user is logged in, block login/signup access
  if (loggedIn) {
    return router.parseUrl('/dashboard');
  }

  // If not logged in, allow the page (login/signup)
  return true;
};
