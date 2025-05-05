import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: any = null;
  carrito: any[] = [];

  nombre: string = '';
  email: string = '';
  direccion: string = '';
  telefono: string = '';
  nuevaPassword: string = '';
  confirmarPassword: string = '';

  editando: boolean = false;

  ngOnInit() {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
    if (!usuarioGuardado) {
      alert('Debes iniciar sesión');
      window.location.href = '/login';
      return;
    }

    this.usuario = usuarioGuardado;

    this.nombre = this.usuario.nombre;
    this.email = this.usuario.email;
    this.direccion = this.usuario.direccion || '';
    this.telefono = this.usuario.telefono || '';

    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  toggleEditar() {
    this.editando = !this.editando;
  }

  guardar() {
    if (this.nuevaPassword && this.nuevaPassword !== this.confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.usuario.nombre = this.nombre;
    this.usuario.email = this.email;
    this.usuario.direccion = this.direccion;
    this.usuario.telefono = this.telefono;

    if (this.nuevaPassword) {
      this.usuario.password = this.nuevaPassword;
    }

    localStorage.setItem('usuarioActual', JSON.stringify(this.usuario));
    alert('✅ Perfil actualizado correctamente');

    this.editando = false;
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = '/home';
  }
}
