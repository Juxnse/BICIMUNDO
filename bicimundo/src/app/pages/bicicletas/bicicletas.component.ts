import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bicicletas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bicicletas.component.html',
  styleUrls: ['./bicicletas.component.css']
})
export class BicicletasComponent implements OnInit {

  bicicletas = [
    {
      id: 1,
      nombre: 'Urban Ride X',
      descripcion: 'Bicicleta híbrida perfecta para trayectos urbanos y rutas de mediana distancia.',
      precio: 750000,
      imagen: 'bicicleta-roja-hibrida.jpg'
    },
    {
      id: 2,
      nombre: 'Mountain Pro 500',
      descripcion: 'Ideal para la aventura en montaña, con suspensión reforzada y frenos hidráulicos.',
      precio: 1200000,
      imagen: 'mountain-pro-500.jpg'
    },
    {
      id: 3,
      nombre: 'Speedster 900',
      descripcion: 'Diseñada para alta velocidad en carretera, con cuadro ligero y componentes aerodinámicos.',
      precio: 950000,
      imagen: 'speedster-900-pro.jpg'
    }
  ];

  usuarioActual: any = null;

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    }
  }

  agregarAlCarrito(bici: any) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    carrito.push(bici);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Bicicleta ${bici.nombre} agregada al carrito`);
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = '/home';
  }
}
