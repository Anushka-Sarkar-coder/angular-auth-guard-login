import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthenticationService); // We "pull in" your AuthenticationService.
  const router = inject(Router); // We need this router instance to redirect user if NOT logged in.

  const loggedIn = auth.isLoggedIn();

  if (loggedIn) {
    return true;
  }

  return router.parseUrl('/login');
};
