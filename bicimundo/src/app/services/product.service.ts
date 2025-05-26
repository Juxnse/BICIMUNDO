import { Injectable }      from '@angular/core';
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
  private storageKey = 'bicicletas';
  private biciSubject = new BehaviorSubject<Bicicleta[]>(this.load());
  bicicletas$ = this.biciSubject.asObservable();

  private load(): Bicicleta[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private save(list: Bicicleta[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
    this.biciSubject.next(list);
  }

  /** Obtiene todas las bicis */
  getAll(): Bicicleta[] {
    return this.biciSubject.value;
  }

  /** Obtiene solo las destacadas */
  getDestacadas(): Bicicleta[] {
    return this.getAll().filter(b => b.destacada);
  }

  /** Crear nueva bicicleta */
  create(bici: Omit<Bicicleta,'id'>) {
    const list = this.getAll();
    const nextId = list.length ? Math.max(...list.map(b=>b.id))+1 : 1;
    this.save([ ...list, { ...bici, id: nextId } ]);
  }

  /** Actualizar bici existente */
  update(updated: Bicicleta) {
    const list = this.getAll().map(b => b.id === updated.id ? updated : b);
    this.save(list);
  }

  /** Eliminar */
  delete(id: number) {
    this.save(this.getAll().filter(b => b.id !== id));
  }
}