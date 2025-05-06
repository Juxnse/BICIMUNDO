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
  email: string = '';
  direccion: string = '';
  telefono: string = '';
  nuevaPassword: string = '';
  confirmarPassword: string = '';

  editando: boolean = false;


  constructor(
    private auth: AuthService,  // ← inyecta AuthService
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
    this.direccion = this.usuario.direccion || '';
    this.telefono = this.usuario.telefono || '';

    this.carrito = JSON.parse(localStorage.getItem(`carrito_${this.usuario.email}`) || '[]');
  }

  toggleEditar() {
    this.editando = !this.editando;
  }

  guardar() {
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
  
    this.usuario = {
      ...this.usuario,
      nombre: this.nombre,
      email: this.email,
      direccion: this.direccion,
      telefono: this.telefono,
      ...(this.nuevaPassword && { password: this.nuevaPassword })
    };

    const emailOriginal = this.usuario!.email;  
    const usuarios: any[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const idx = usuarios.findIndex(u => u.email === emailOriginal);
    if (idx > -1) {
      usuarios[idx] = { ...usuarios[idx], ...this.usuario };
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // 2) Actualiza AuthService y localStorage simultáneamente
    this.auth.setUser(this.usuario);

    Swal.fire({
      position: 'top',
      icon: 'success',
      text: 'Perfil actualizado correctamente.',
      showConfirmButton: false,
      timer: 1000
    });

    this.editando = false;
  }

}


