import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  carrito: any[] = [];

  login() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === this.email && u.password === this.password);

    if (usuario) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      alert(`Bienvenido, ${usuario.nombre} 👋`);

      window.location.href = '/home';
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = '/login';
  }
}
