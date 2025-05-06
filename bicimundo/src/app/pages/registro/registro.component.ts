import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

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

  constructor(private location: Location,
    private auth: AuthService,
    private router: Router
  ) {}


  goBack(): void {
    this.location.back();
  }

  registrarUsuario() {
    if (this.password !== this.password2) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              text: 'Las contraseñas no coinciden.',
              confirmButtonText: 'Volver a intentar.',
              confirmButtonColor: '#e60023',
            });;
      return;
    }

    const usuarios: any[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some(u => u.email === this.email)) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        text: 'Este usuario ya está registrado.',
        confirmButtonText: 'Cerrar.',
        confirmButtonColor: '#e60023',
      });
      return;
    }

      const nuevoUsuario = {
        nombre: this.nombre,
        cedula: this.cedula,
        email: this.email,
        fechaNacimiento: this.fechaNacimiento,
        password: this.password,
        rol: this.rol      // siempre 'cliente'
      };

    usuarios.push(nuevoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.auth.setUser(nuevoUsuario);

    Swal.fire({
      position: 'top',
      icon: 'success',
      text: `Usuario registrado correctamente ¡Bienvenido ${nuevoUsuario.nombre}!`,
      showConfirmButton: false,
      timer: 1000
    }).then(() => {
      this.router.navigate(['/home']);
    });
  }
}

