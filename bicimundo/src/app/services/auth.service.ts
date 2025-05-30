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
    this.getStoredUser()
  );


  private getStoredUser(): User | null {
    const raw = localStorage.getItem('usuarioActual');
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch (err) {
      console.error('❌ JSON inválido en localStorage:', err);
      localStorage.removeItem('usuarioActual');
      return null;
    }
  }

  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private router: Router) {}

setUser(user: User) {
  localStorage.setItem('usuarioActual', JSON.stringify(user));
  this.userSubject.next(user);
  console.log('🌐 setUser llamado en:', this.router.url);

  this.router.navigateByUrl('/login', { replaceUrl: true });
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

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
