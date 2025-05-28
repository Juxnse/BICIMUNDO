import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarritoApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getOrCreateCarrito(clienteId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/carritos/${clienteId}`);
  }

  agregarItem(carritoId: number, productoId: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/carrito-items`, {
      carrito_id: carritoId,
      producto_id: productoId,
      cantidad
    });
  }

  obtenerItems(carritoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/carrito-items/${carritoId}`);
  }

  eliminarItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/carrito-items/${itemId}`);
  }
}
