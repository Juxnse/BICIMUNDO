import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Bicicleta } from '../../services/product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarioActual: any = null;

  bicicletasDestacadas: Bicicleta[] = [];

  constructor(private productService: ProductService,
    private cart: CartService
  ) { }

  ngOnInit() {
    this.productService.bicicletas$.subscribe(bicis => {
      this.bicicletasDestacadas = this.productService.getDestacadas();
    });
    this.productService.getFromSupabase();


    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    }
  }

    agregarAlCarrito(bici: Bicicleta) {
      if (!bici) return;
  
      this.cart.agregarAlCarrito(bici);
  
    }
}
