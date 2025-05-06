import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from './services/cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  ) {}


  ngOnInit() {

    this.cartCount$ = this.cartService.carrito$.pipe(
      map(items => items.length)
    );
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    }

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
    localStorage.removeItem('usuarioActual');
    this.cartService.clear();
    window.location.href = '/home';
    
  }

}
