import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProductService, Bicicleta } from '../../../services/product.service';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://zypbnamuapdrrlggitgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5cGJuYW11YXBkcnJsZ2dpdGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyOTQ4NDgsImV4cCI6MjA2Mzg3MDg0OH0.DkW01pwa_M1IBHwta40EdqHy9p80l2NvwS4EO5S_1ao'                         // ⚠️ Reemplaza con tu anon key real
);

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
  imagenFile: File | null = null;

  constructor(
    private ps: ProductService,
    private router: Router
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];
    }
  }

  async create() {
    if (!this.imagenFile) {
      alert('Debes seleccionar una imagen.');
      return;
    }

    const nombreImagen = `bicis/${Date.now()}-${this.imagenFile.name}`;

    const { data, error } = await supabase.storage
      .from('imagenes')
      .upload(nombreImagen, this.imagenFile);

    if (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir imagen');
      return;
    }

    const imageUrl = `https://zypbnamuapdrrlggitgv.supabase.co/storage/v1/object/public/imagenes/${nombreImagen}`;

    const nuevaBici: Omit<Bicicleta, 'id'> = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      imagen: imageUrl,
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
