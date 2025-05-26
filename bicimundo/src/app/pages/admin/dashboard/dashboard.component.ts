// src/app/pages/admin/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Bicicleta } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule                
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  bicis: Bicicleta[] = [];

  constructor(private ps: ProductService) {}

  ngOnInit() {
    this.bicis = this.ps.getAll();
    this.ps.bicicletas$.subscribe(list => this.bicis = list);
  }

  save(b: Bicicleta) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas guardar los cambios realizados?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e60023',
      cancelButtonColor: '#6c757d'
    }).then(result => {
      if (result.isConfirmed) {
        this.ps.update(b);
        Swal.fire({
          title: 'Guardado',
          text: 'Los cambios se han guardado correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  del(id: number) {
    // buscamos el nombre para el mensaje
    const bici = this.bicis.find(x => x.id === id);
    const nombre = bici ? bici.nombre : 'este producto';

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el producto "${nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e60023',
      cancelButtonColor: '#6c757d'
    }).then(result => {
      if (result.isConfirmed) {
        this.ps.delete(id);
        Swal.fire({
          title: 'Eliminado',
          text: `"${nombre}" ha sido eliminado.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}