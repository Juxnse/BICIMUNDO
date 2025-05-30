import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService, User } from '../../services/auth.service';
import { ClienteApiService } from '../../services/cliente-api.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: User | null = null;
  carrito: any[] = [];

  nombre = '';
  cedula = '';
  email = '';
  direccion = '';
  telefono = '';

  contrasenaActual = '';
  nuevaPassword = '';
  confirmarPassword = '';

  editando = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private clienteApi: ClienteApiService
  ) {}

  ngOnInit() {
    const user = this.auth.currentUser;
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuario = user;
    this.nombre = user.nombre;
    this.email = user.email;
    this.cedula = user.cedula || '';
    this.direccion = user.direccion || '';
    this.telefono = user.telefono || '';
    this.carrito = JSON.parse(localStorage.getItem(`carrito_${user.email}`) || '[]');
  }

  toggleEditar(): void {
    this.editando = !this.editando;
  }

  guardar(): void {
    if (!this.contrasenaActual) {
      Swal.fire({
        icon: 'error',
        text: 'Debes ingresar tu contraseña actual para guardar cambios.',
        confirmButtonColor: '#e60023',
      });
      return;
    }

    // No validar aquí en frontend, lo hará el backend
    if (!this.contrasenaActual) {
      Swal.fire({
        icon: 'error',
        text: 'Debes ingresar tu contraseña actual para guardar cambios.',
        confirmButtonColor: '#e60023',
      });
      return;
    }

    // El backend validará la contraseña actual y la nueva

    // Si se solicita cambio de contraseña, validaciones
    if (this.nuevaPassword) {
      if (this.nuevaPassword !== this.confirmarPassword) {
        Swal.fire({
          icon: 'error',
          text: 'Las nuevas contraseñas no coinciden.',
          confirmButtonColor: '#e60023',
        });
        return;
      }
      if (this.nuevaPassword === this.contrasenaActual) {
        Swal.fire({
          icon: 'error',
          text: 'La contraseña nueva debe ser diferente a la actual.',
          confirmButtonColor: '#e60023',
        });
        return;
      }
    }

    // Construyo payload
    const payload: any = {
      nombre: this.nombre,
      email: this.email,
      cedula: this.cedula,
      direccion: this.direccion,
      telefono: this.telefono,
      fechaNacimiento: this.usuario?.fechaNacimiento,
    };

    if (this.nuevaPassword) {
      payload.currentPassword = this.contrasenaActual;
      payload.newPassword = this.nuevaPassword;
    } else {
      // si no cambia contraseña, mando currentPassword para validación
      payload.currentPassword = this.contrasenaActual;
    }

    this.clienteApi
      .actualizarCliente(this.usuario!.id.toString(), payload)
      .subscribe({
        next: () => {
          // Actualizar user localmente
          const actualizadoUsuario: User = {
            ...this.usuario!,
            nombre: this.nombre,
            email: this.email,
            cedula: this.cedula,
            direccion: this.direccion,
            telefono: this.telefono,
            password: this.nuevaPassword || this.usuario!.password,
            fechaNacimiento: this.usuario!.fechaNacimiento,
          };
          this.auth.updateUserLocally(actualizadoUsuario);

          Swal.fire({
            icon: 'success',
            text: 'Perfil actualizado correctamente.',
            timer: 1000,
            showConfirmButton: false,
          });

          // Limpio campos
          this.contrasenaActual = '';
          this.nuevaPassword = '';
          this.confirmarPassword = '';
          this.editando = false;
        },
        error: err => {
          const msg = err?.error?.message || 'Error al actualizar el perfil.';
          Swal.fire({
            icon: 'error',
            text: msg,
            confirmButtonColor: '#e60023',
          });
        }
      });
  }
}
