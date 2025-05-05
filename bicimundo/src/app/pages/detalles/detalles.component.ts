import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  producto: any;
  usuarioActual: any = null;

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener usuario actual
    this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');

    // Obtener ID del producto desde la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.producto = this.bicicletas.find(bici => bici.id === id);
  }

  agregarAlCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    carrito.push(this.producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Bicicleta ${this.producto.nombre} agregada al carrito`);
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = '/home';
  }
  

}
