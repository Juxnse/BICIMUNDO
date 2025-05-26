import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: any = null;
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
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.auth.currentUser;
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuario = user;

    this.nombre = this.usuario.nombre;
    this.email = this.usuario.email;
    this.cedula = this.usuario.cedula;
    this.direccion = this.usuario.direccion || '';
    this.telefono = this.usuario.telefono || '';

    this.carrito = JSON.parse(localStorage.getItem(`carrito_${this.usuario.email}`) || '[]');
  }

  toggleEditar() {
    this.editando = !this.editando;
  }

    guardar() {
    // 2) Validación: debe ingresar la actual
    if (!this.contrasenaActual) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        text: 'Debes ingresar tu contraseña actual para poder actualizar los datos de tu perfil.',
        showConfirmButton: true,
        confirmButtonColor: '#e60023',
      });
      return;
    }

    // 3) Validación: contraseña actual correcta
    if (this.contrasenaActual !== this.usuario.password) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        text: 'Contraseña actual incorrecta.',
        showConfirmButton: true,
        confirmButtonColor: '#e60023',
      });
      return;
    }

    // 4) Validación de nueva vs confirmación (solo si ingresó nueva)
    if (this.nuevaPassword && this.nuevaPassword !== this.confirmarPassword) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        text: 'Las contraseñas no coinciden.',
        showConfirmButton: true,
        confirmButtonColor: '#e60023',
      });
      return;
    }

    // 5) Guardar cambios
    // Conservamos el email original para buscar el índice
    const emailOriginal = this.usuario.email;

    // Preparamos objeto mergeado
    const actualizadoUsuario = {
      ...this.usuario,
      nombre: this.nombre,
      email: this.email,
      cedula: this.cedula,
      direccion: this.direccion,
      telefono: this.telefono,
      // Solo sobreescribimos password si ingresó nuevaPassword
      ...(this.nuevaPassword && { password: this.nuevaPassword })
    };

    // Actualizamos array en localStorage
    const usuarios: any[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const idx = usuarios.findIndex(u => u.email === emailOriginal);
    if (idx > -1) {
      usuarios[idx] = actualizadoUsuario;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Actualizamos AuthService y localStorage interno
    this.auth.setUser(actualizadoUsuario);

    Swal.fire({
      position: 'top',
      icon: 'success',
      text: 'Perfil actualizado correctamente.',
      showConfirmButton: false,
      timer: 1000
    });


    this.contrasenaActual = '';
    this.nuevaPassword = '';
    this.confirmarPassword = '';
    this.editando = false;
  }
}


