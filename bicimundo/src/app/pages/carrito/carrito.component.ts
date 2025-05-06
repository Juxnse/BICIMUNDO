// carrito.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];  
  total: number = 0;
  usuarioActual: any = null;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    }

    this.cartService.carrito$.subscribe(items => {
      this.carrito = items;
      this.total = items.reduce((acc, i) => acc + i.precio, 0);
    });
  }

  eliminarDelCarrito(index: number) {
    this.cartService.eliminarDelCarrito(index);
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    this.cartService.clear();
    window.location.href = '/home';
  }
}

