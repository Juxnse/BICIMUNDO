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
  nombre: string = '';
  cedula: string = '';
  email: string = '';
  direccion: string = '';
  telefono: string = '';
  nuevaPassword: string = '';
  confirmarPassword: string = '';
  contrasenaActual: string = '';
  editando: boolean = false;

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
    this.carrito = JSON.parse(localStorage.getItem(`carrito_${this.usuario.email}`) || '[]');
  }

  toggleEditar() {
    this.editando = !this.editando;
  }

  guardar() {
    if (!this.contrasenaActual) {
      Swal.fire({
        icon: 'error',
        text: 'Debes ingresar tu contraseña actual.',
        confirmButtonColor: '#e60023',
      });
      return;
    }

    if (this.contrasenaActual !== this.usuario?.password) {
      Swal.fire({
        icon: 'error',
        text: 'Contraseña actual incorrecta.',
        confirmButtonColor: '#e60023',
      });
      return;
    }

    if (this.nuevaPassword && this.nuevaPassword !== this.confirmarPassword) {
      Swal.fire({
        icon: 'error',
        text: 'Las nuevas contraseñas no coinciden.',
        confirmButtonColor: '#e60023',
      });
      return;
    }

    const actualizado = {
      nombre: this.nombre,
      email: this.email,
      cedula: this.cedula,
      direccion: this.direccion,
      telefono: this.telefono,
      ...(this.nuevaPassword && { password: this.nuevaPassword }),
      fechaNacimiento: this.usuario?.fechaNacimiento,
    };

    this.clienteApi.actualizarCliente(this.usuario!.id.toString(), actualizado).subscribe({
      next: () => {
        const actualizadoUsuario: User = {
          ...this.usuario!,
          ...actualizado,
          password: this.nuevaPassword || this.usuario!.password
        };

        this.auth.updateUserLocally(actualizadoUsuario);

        Swal.fire({
          icon: 'success',
          text: 'Perfil actualizado correctamente.',
          timer: 1000,
          showConfirmButton: false
        });

        this.contrasenaActual = '';
        this.nuevaPassword = '';
        this.confirmarPassword = '';
        this.editando = false;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          text: err?.error?.message || 'Error al actualizar el perfil.',
          confirmButtonColor: '#e60023',
        });
      }
    });
  }
}
