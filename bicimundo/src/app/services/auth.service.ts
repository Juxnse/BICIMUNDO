
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface User {
    id: number;
    cedula: string;
    email: string;
    nombre: string;
    fechaNacimiento: string;
    password: string;
    rol: string;
  }
  
@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject = new BehaviorSubject<User|null>(
        JSON.parse(localStorage.getItem('usuarioActual') || 'null')
      )
  user$: Observable<User|null> = this.userSubject.asObservable();

  setUser(user: any) {
    localStorage.setItem('usuarioActual', JSON.stringify(user));
    this.userSubject.next(user);
  }


  clearUser() {
    localStorage.removeItem('usuarioActual');
    this.userSubject.next(null);
  }

  get currentUser() {
    return this.userSubject.value;
  }
}
