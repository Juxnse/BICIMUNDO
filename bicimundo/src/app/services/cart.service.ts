
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private carrito = new BehaviorSubject<any[]>(this.obtenerCarritoDesdeStorage());
  carrito$ = this.carrito.asObservable();

  private obtenerCarritoDesdeStorage(): any[] {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  private saveCart(cart: any[]) {
    localStorage.setItem('carrito', JSON.stringify(cart));
    this.carrito.next(cart);
  }

  agregarAlCarrito(producto: any) {
    const nuevo = [...this.carrito.value, producto];
    this.saveCart(nuevo);
  }

  eliminarDelCarrito(index: number) {
    const copia = [...this.carrito.value];
    copia.splice(index, 1);
    this.saveCart(copia);
  }

  clear() {
    this.saveCart([]);
  }
}
