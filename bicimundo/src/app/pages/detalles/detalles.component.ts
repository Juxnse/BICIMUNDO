import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService, Bicicleta } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  cantidad = 1;
  producto!: Bicicleta;
  usuarioActual: any = null;
  selectedTab: 'descripcion'|'reseñas'|'preguntas' = 'descripcion';

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
    const id = Number(this.route.snapshot.paramMap.get('id'));
        this.producto = this.productService.getAll().find(b => b.id === id)!;
  }

  setTab(tab: 'descripcion'|'reseñas'|'preguntas') {
    this.selectedTab = tab;
  }

  agregarAlCarrito(producto: Bicicleta) {
    if (!this.producto) return;
    this.cartService.agregarAlCarrito(this.producto, this.cantidad);
  }
}


