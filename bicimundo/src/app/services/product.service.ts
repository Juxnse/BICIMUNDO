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
  private apiUrl = 'http://localhost:3000/api/productos';
  private storageKey = 'bicicletas';
  private biciSubject = new BehaviorSubject<Bicicleta[]>(this.load());
  bicicletas$ = this.biciSubject.asObservable();

  constructor(private http: HttpClient) {}

  private load(): Bicicleta[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private save(list: Bicicleta[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
    this.biciSubject.next(list);
  }

  getAll(): Bicicleta[] {
    return this.biciSubject.value;
  }

  getDestacadas(): Bicicleta[] {
    return this.getAll().filter(b => b.destacada);
  }

  // ✅ Obtener productos desde Supabase
  getFromSupabase() {
    this.http.get<Bicicleta[]>(this.apiUrl).subscribe({
      next: (res) => {
        const lista = Array.isArray(res) ? res : [];
        this.save(lista); // actualiza localStorage
        console.log('✅ Productos cargados desde Supabase');
      },
      error: (err) => {
        console.error('❌ Error al obtener productos de Supabase', err);
      }
    });
  }

  // Crear nueva bicicleta
  create(bici: Omit<Bicicleta, 'id'>) {
    const list = this.getAll();
    const nextId = list.length ? Math.max(...list.map(b => b.id)) + 1 : 1;
    const nuevaBici = { ...bici, id: nextId };

    this.save([...list, nuevaBici]);

    const { nombre, descripcion, precio, imagen, stock } = bici;

    this.http.post(this.apiUrl, {
      nombre,
      descripcion,
      precio,
      imagen,
      stock
    }).subscribe({
      next: res => console.log('Producto guardado en Supabase', res),
      error: err => console.error('Error al guardar en Supabase', err)
    });
  }

  // Actualizar bici local (por ahora solo localStorage)
  update(updated: Bicicleta) {
    const list = this.getAll().map(b => b.id === updated.id ? updated : b);
    this.save(list);
    // Aquí en el futuro se puede hacer un PUT/PATCH a Supabase
  }

  // Eliminar remotamente + localmente
  delete(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        console.log(`Producto ${id} eliminado de Supabase`);

        const updatedList = this.getAll().filter(b => b.id !== id);
        this.save(updatedList);
      },
      error: err => {
        console.error('Error al eliminar en Supabase', err);
      }
    });
  }
}
