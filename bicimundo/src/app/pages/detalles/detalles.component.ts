import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  cantidad: number = 1;
  producto: any;
  usuarioActual: any = null;
  selectedTab: 'descripcion' | 'reseñas' | 'preguntas' = 'descripcion';

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



  constructor(private route: ActivatedRoute,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.producto = this.bicicletas.find(bici => bici.id === id);
  }

  setTab(tab: 'descripcion'|'reseñas'|'preguntas') {
    this.selectedTab = tab;
  }

  agregarAlCarrito(bici: any) {
    this.cartService.agregarAlCarrito(bici, this.cantidad);
       Swal.fire({
          position: "top-end",
          icon: "success",
          text: `Agregaste ${this.cantidad} x ${bici.nombre} al carrito.`,
          showConfirmButton: false,
          timer: 1000
        });
  }

}

