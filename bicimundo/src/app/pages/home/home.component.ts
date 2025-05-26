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

  bicicletasDestacadas$: Observable<Bicicleta[]>;

  constructor(private ps: ProductService,
    private cart: CartService
  ) {
    this.bicicletasDestacadas$ = this.ps.bicicletas$.pipe(
      map(list => list.filter(b => b.destacada))
    );
  }

  ngOnInit() {
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
