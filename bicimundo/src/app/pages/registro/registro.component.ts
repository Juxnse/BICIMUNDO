import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  nombre: string = '';
  cedula: string = '';
  email: string = '';
  fechaNacimiento: string = '';
  password: string = '';
  password2: string = '';
  rol: string = 'cliente';
  carrito: any[] = [];

  registrarUsuario() {
    if (this.password !== this.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const existe = usuarios.find((u: any) => u.email === this.email);

    if (existe) {
      alert('Este correo ya está registrado');
      return;
    }

    usuarios.push({
      nombre: this.nombre,
      cedula: this.cedula,
      email: this.email,
      fechaNacimiento: this.fechaNacimiento,
      password: this.password,
      rol: this.rol
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuario registrado exitosamente 🎉');

    window.location.href = '/login';
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = '/login';
  }
}
