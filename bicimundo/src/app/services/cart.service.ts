
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Bicicleta, ProductService } from './product.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class CartService {
  private carrito = new BehaviorSubject<any[]>([]);
  carrito$ = this.carrito.asObservable();

  constructor(private auth: AuthService,
    private productService: ProductService,
  ) {
    this.auth.user$.subscribe(user => {
      const carritoGuardado = user 
        ? JSON.parse(localStorage.getItem(`carrito_${user.email}`) || '[]')
        : [];
      this.carrito.next(carritoGuardado);
    });
  }


  private saveCart(cart: any[]) {
    const user = this.auth.currentUser;
    if (user && user.email) {
      localStorage.setItem(`carrito_${user.email}`, JSON.stringify(cart));
    } else {
      localStorage.setItem('carrito_invitado', JSON.stringify(cart));
    }
  }

   agregarAlCarrito(producto: Bicicleta, cantidad: number = 1) {
    if (!this.auth.currentUser) {
      Swal.fire(
        'Error',
        'No se pueden agregar bicicletas al carrito si no estás logeado',
        'error'
      );
      return;
    }

    if (producto.stock < cantidad) {
        Swal.fire('Sin stock', 'No hay stock disponible para éste producto por el momento, lamentamos las molestias.', 'warning',
        );
      return;
    }

    const updatedBike: Bicicleta = {
      ...producto,
      stock: producto.stock - cantidad
    };
    this.productService.update(updatedBike);

    const cartClone = [...this.carrito.value];
    const idx = cartClone.findIndex(item => item.id === producto.id);

    if (idx > -1) {
      cartClone[idx].cantidad += cantidad;
    } else {
      cartClone.push({ ...producto, cantidad });
    }

    this.carrito.next(cartClone);
    this.saveCart(cartClone);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text: `Agregaste ${cantidad} x ${producto.nombre} al carrito.`,
      showConfirmButton: false,
      timer: 1000
    });
  }
  

eliminarDelCarrito(index: number) {
  const cartClone = [...this.carrito.value];

  const [eliminado] = cartClone.splice(index, 1);


  if (eliminado) {

    const todasLasBicis = this.productService.getAll();

    const biciEnStock = todasLasBicis.find(b => b.id === eliminado.id);
    if (biciEnStock) {

      const updatedBici: Bicicleta = {
        ...biciEnStock,
        stock: biciEnStock.stock + (eliminado.cantidad || 1)
      };

      this.productService.update(updatedBici);
    }
  }


  this.carrito.next(cartClone);
  this.saveCart(cartClone);
}

  clear() {
    this.saveCart([]);
  }
}
