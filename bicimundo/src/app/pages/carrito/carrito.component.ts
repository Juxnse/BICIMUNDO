import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: any[] = [];
  total: number = 0;
  usuarioActual: any = null;

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    }
    this.cargarCarrito();
  }

  cargarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    this.carrito = carritoGuardado;
    this.total = this.carrito.reduce((acc, item) => acc + item.precio, 0);
  }

  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = '/home';
  }
}
