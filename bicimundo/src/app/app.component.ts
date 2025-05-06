import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from './services/cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    CommonModule, 
    RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'bicimundo';
  cartCount$!: Observable<number>;
  usuarioActual: any = null;
  currentRoute = '';
  ocultarEnRutas = ['/login', '/registro'];


  
  
  constructor(private router: Router,
    private cartService: CartService,
    private auth: AuthService
  ) {}


  ngOnInit() {

    this.cartCount$ = this.cartService.carrito$.pipe(
      map(items => items.reduce((acc, i) => acc + (i.cantidad || 1), 0))
    );

    this.auth.user$.subscribe((user: any) => {
      this.usuarioActual = user;
    });

    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        this.currentRoute = evt.urlAfterRedirects;
      });
  }

  shouldShowLayout(): boolean {
    return !this.ocultarEnRutas.includes(this.currentRoute);
  }

  cerrarSesion() {
    this.auth.clearUser();
    window.location.href = '/home';
    
  }

}

