import { inject }   from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  const user   = auth.currentUser;

  console.log('⚙ adminGuard: currentUser=', user);

  if (user?.rol === 'admin') {
    console.log('⚙ adminGuard: ✓ es admin');
    return true;
  }

  console.log('⚙ adminGuard: ✗ no es admin, redirigiendo');
  return router.parseUrl('/home');
};