import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ClienteApiService } from '../../services/cliente-api.service';

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

  constructor(
    private router: Router,
    private auth: AuthService,
    private clienteApi: ClienteApiService
  ) {}

  login() {
    this.clienteApi.loginCliente({ email: this.email, password: this.password }).subscribe({
      next: (usuario: any) => {
        this.auth.setUser(usuario);
        Swal.fire({
          position: 'top',
          icon: 'success',
          text: `Bienvenido, ${usuario.nombre} 👋`,
          showConfirmButton: false,
          timer: 1000
        });

      },
      error: (err) => {
        Swal.fire({
          position: 'top',
          icon: 'error',
          text: err?.error?.message || 'Correo o contraseña incorrectos.',
          confirmButtonText: 'Volver a intentar',
          confirmButtonColor: '#e60023',
        });
      }
    });
  }
}
