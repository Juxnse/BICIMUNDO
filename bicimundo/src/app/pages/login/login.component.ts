import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, RouterModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router,
    private auth: AuthService,
  ) {}

  login() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) =>
      u.email === this.email && u.password === this.password
    );

    if (usuario) {
      this.auth.setUser(usuario);

      Swal.fire({
        position: 'top',
        icon: 'success',
        text: `Bienvenido, ${usuario.nombre} 👋`,
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
         if (usuario.rol !== 'admin') {
        this.router.navigate(['/home']);
         }
      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        text: 'Correo o contraseña incorrectos.',
        confirmButtonText: 'Volver a intentar.',
        confirmButtonColor: '#e60023',
      });
    }
  }
}
