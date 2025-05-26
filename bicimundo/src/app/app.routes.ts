import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BicicletasComponent } from './pages/bicicletas/bicicletas.component';
import { DetallesComponent } from './pages/detalles/detalles.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { authGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminCreateComponent } from './pages/admin/create/create.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bicicletas', component: BicicletasComponent },
  { path: 'detalles/:id', component: DetallesComponent },
  { path: 'carrito', component: CarritoComponent, canActivate: [authGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'admin',
    canActivate:     [adminGuard],
    canActivateChild: [adminGuard], 
    children: [
      { path: '',       component: AdminDashboardComponent },
      { path: 'create', component: AdminCreateComponent }
    ]
  },
];
