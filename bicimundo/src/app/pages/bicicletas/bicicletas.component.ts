import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';


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


  constructor(
    private cartService: CartService,
  ) {}


  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    }
  }

  agregarAlCarrito(bici: any) {
    this.cartService.agregarAlCarrito(bici);
    Swal.fire({
      position: "top-end",
      icon: "success",
      text: `La bicicleta "${bici.nombre}" ha sido agregada al carrito.`,
      showConfirmButton: false,
      timer: 1000
    });
  }
}
