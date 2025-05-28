import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  cedula: string;
  email: string;
  nombre: string;
  fechaNacimiento?: string;
  password: string;
  rol: string;
  direccion?: string;
  telefono?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('usuarioActual') || 'null')
  );
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private router: Router) {}

setUser(user: User) {
  localStorage.setItem('usuarioActual', JSON.stringify(user));
  this.userSubject.next(user);
  console.log('🌐 setUser llamado en:', this.router.url);


  const rutaActual = this.router.url;

  if (user.rol === 'admin' && !rutaActual.startsWith('/admin')) {
    this.router.navigateByUrl('/admin', { replaceUrl: true });
  } else if (user.rol !== 'admin' && rutaActual !== '/home') {
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}

updateUserLocally(user: User) {
  localStorage.setItem('usuarioActual', JSON.stringify(user));
  this.userSubject.next(user);
}


  clearUser() {
    localStorage.removeItem('usuarioActual');
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }
}
