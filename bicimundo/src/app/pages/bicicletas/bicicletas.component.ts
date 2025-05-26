import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService, Bicicleta } from '../../services/product.service';


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
    private ps: ProductService,
    private cart: CartService
  ) {}

  

  usuarioActual: any = null;


  ngOnInit() {
    this.bicicletas = this.ps.getAll();
    this.ps.bicicletas$.subscribe(list => this.bicicletas = list);
  }

  agregarAlCarrito(bici: Bicicleta) {
    if (!bici) return;

    this.cart.agregarAlCarrito(bici);

  }
}

