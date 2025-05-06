

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private carrito = new BehaviorSubject<any[]>([]);
  carrito$ = this.carrito.asObservable();

  constructor(private auth: AuthService) {
    this.auth.user$.subscribe(user => {
      const carritoGuardado = user 
        ? JSON.parse(localStorage.getItem(`carrito_${user.email}`) || '[]')
        : [];
      this.carrito.next(carritoGuardado);
    });
  }


  private saveCart(cart: any[]) {
    const user = this.auth.currentUser;
    if (user && user.email) {
      localStorage.setItem(`carrito_${user.email}`, JSON.stringify(cart));
    } else {
      localStorage.setItem('carrito_invitado', JSON.stringify(cart));
    }
  }

  agregarAlCarrito(producto: any, cantidad: number = 1) {
    const cart = [...this.carrito.value];
    const idx = cart.findIndex(item => item.id === producto.id);
  
    if (idx > -1) {
      cart[idx].cantidad += cantidad;
    } else {
      cart.push({ ...producto, cantidad });
    }
  
    this.carrito.next(cart); 
    this.saveCart(cart);     
  }
  

  eliminarDelCarrito(index: number) {
    const copia = [...this.carrito.value];
    copia.splice(index, 1);
    this.carrito.next(copia);    
    this.saveCart(copia);        
  }

  clear() {
    this.saveCart([]);
  }
}

