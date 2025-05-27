import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProductService, Bicicleta } from '../../../services/product.service';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class AdminCreateComponent {
  nombre = '';
  descripcion = '';
  precio = 0;
  stock = 1;
  destacada = false;
  imagenUrl: string = '';

  constructor(
    private ps: ProductService,
    private router: Router
  ) {}

  create() {
    const nuevaBici: Omit<Bicicleta, 'id'> = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      imagen: this.imagenUrl || '',
      stock: this.stock,
      destacada: this.destacada,
    };

    this.ps.create(nuevaBici);

    alert('Producto creado correctamente.');
    this.router.navigate(['/admin']);
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
