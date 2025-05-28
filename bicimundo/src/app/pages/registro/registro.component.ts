import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ClienteApiService } from '../../services/cliente-api.service'; // nuevo servicio

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre = '';
  cedula = '';
  email = '';
  fechaNacimiento = '';
  password = '';
  password2 = '';
  rol = 'cliente';

  constructor(
    private location: Location,
    private auth: AuthService,
    private router: Router,
    private clienteApi: ClienteApiService // nuevo
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
        confirmButtonText: 'Volver a intentar',
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
      rol: this.rol
    };

    this.clienteApi.crearCliente(nuevoUsuario).subscribe({
      next: (res: any) => {
        this.auth.setUser(res);
        Swal.fire({
          position: 'top',
          icon: 'success',
          text: `Usuario registrado correctamente ¡Bienvenido ${res.nombre}!`,
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: err?.error?.message || 'Algo salió mal.',
          confirmButtonColor: '#e60023',
        });
      }
    });
  }
}
