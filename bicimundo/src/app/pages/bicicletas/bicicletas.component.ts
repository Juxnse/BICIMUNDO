import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Bicicleta } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-bicicletas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bicicletas.component.html',
  styleUrls: ['./bicicletas.component.css']
})
export class BicicletasComponent implements OnInit {
  bicicletas: Bicicleta[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.bicicletas$.subscribe(bicis => {
      this.bicicletas = bicis;
    });
    this.productService.getFromSupabase(); // Asegura la carga inicial
  }

  agregarAlCarrito(bici: Bicicleta) {
    this.cartService.agregarAlCarrito(bici, 1);
  }
}
