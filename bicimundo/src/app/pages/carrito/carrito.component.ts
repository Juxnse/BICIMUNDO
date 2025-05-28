import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.carrito$.subscribe(items => {
      this.carrito = items;
      this.total = items.reduce((acc, item) => acc + (item.subtotal || 0), 0);
    });
  }

  eliminarDelCarrito(itemId: number) {
    this.cartService.eliminarDelCarrito(itemId);
  }
}
