import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Bicicleta, ProductService } from './product.service';
import Swal from 'sweetalert2';
import { CarritoApiService } from './carrito-api.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private carrito = new BehaviorSubject<any[]>([]);
  carrito$ = this.carrito.asObservable();
  private carritoId: number | null = null;

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private carritoApi: CarritoApiService
  ) {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.carritoApi.getOrCreateCarrito(user.id).subscribe(carrito => {
          this.carritoId = carrito?.id ?? null;
          if (this.carritoId !== null) {
            this.cargarItems(this.carritoId);
          }
        });
      } else {
        this.carrito.next([]);
        this.carritoId = null;
      }
    });
  }

  private cargarItems(carritoId: number) {
    this.carritoApi.obtenerItems(carritoId).subscribe(items => {
      this.carrito.next(items);
    });
  }

  agregarAlCarrito(producto: Bicicleta, cantidad: number = 1) {
    const user = this.auth.currentUser;
    if (!user) {
      Swal.fire('Error', 'Debes iniciar sesión para agregar productos', 'error');
      return;
    }

    if (producto.stock < cantidad) {
      Swal.fire('Sin stock', 'No hay stock disponible', 'warning');
      return;
    }

    if (this.carritoId === null) {
      Swal.fire('Error', 'Carrito no disponible. Intenta nuevamente.', 'error');
      return;
    }

    this.productService.update({
      ...producto,
      stock: producto.stock - cantidad
    });

    this.carritoApi.agregarItem(this.carritoId, producto.id, cantidad).subscribe(() => {
      this.cargarItems(this.carritoId!);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: `Agregaste ${cantidad} x ${producto.nombre}`,
        showConfirmButton: false,
        timer: 1000
      });
    });
  }

  eliminarDelCarrito(itemId: number) {
    if (this.carritoId === null) return;

    this.carritoApi.eliminarItem(itemId).subscribe(() => {
      this.cargarItems(this.carritoId!);
    });
  }

  clear() {
    this.carrito.next([]);
  }
}
