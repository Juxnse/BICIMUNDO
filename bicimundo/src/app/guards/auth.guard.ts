import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const usuario = localStorage.getItem('usuarioActual');

  if (usuario) {
    return true; // ✅ Está logueado → permitir acceso
  } else {
    window.location.href = '/login'; // 🚫 No está logueado → redirigir a login
    return false;
  }
};
