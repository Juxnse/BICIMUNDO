import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Bicicleta {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
  destacada: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:3000/productos';
  private biciSubject = new BehaviorSubject<Bicicleta[]>([]);
  bicicletas$ = this.biciSubject.asObservable();

  constructor(private http: HttpClient) {}

  getFromSupabase(): void {
    this.http.get<Bicicleta[]>(this.apiUrl).subscribe({
      next: (lista) => {
        this.biciSubject.next(lista);
        console.log('✅ Productos cargados desde Supabase');
      },
      error: (err) => {
        console.error('❌ Error al obtener productos:', err);
      }
    });
  }

  create(bici: Omit<Bicicleta, 'id'>): void {
    this.http.post(this.apiUrl, bici).subscribe({
      next: (res) => {
        console.log('✅ Producto creado:', res);
        this.getFromSupabase(); 
      },
      error: (err) => {
        console.error('❌ Error al crear producto:', err);
      }
    });
  }

  delete(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        console.log(`✅ Producto ${id} eliminado`);
        this.getFromSupabase();
      },
      error: (err) => {
        console.error(`❌ Error al eliminar producto ${id}:`, err);
      }
    });
  }

  update(bici: Bicicleta): void {
    this.http.patch(`${this.apiUrl}/${bici.id}`, bici).subscribe({
      next: () => {
        console.log(`✅ Producto ${bici.id} actualizado`);
        this.getFromSupabase();
      },
      error: (err) => {
        console.error(`❌ Error al actualizar producto ${bici.id}:`, err);
      }
    });
  }

  getAll(): Bicicleta[] {
    return this.biciSubject.value;
  }

  getDestacadas(): Bicicleta[] {
    return this.getAll().filter(b => b.destacada);
  }
}
