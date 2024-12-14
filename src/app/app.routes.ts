import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { ProductoDetailComponent } from './productos/producto-detail/producto-detail.component';
import { ProductoUpdateComponent } from './productos/producto-update/producto-update.component';
import { ProductoListComponent } from './productos/producto-list/producto-list.component';
import { CarritoComponent } from './carrito/carrito.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { adminGuard } from './admin.guard';
import { CategoriaListComponent } from './categorias/categoria-list/categoria-list.component';
import { CategoriaDetailComponent } from './categorias/categoria-detail/categoria-detail.component';
import { CategoriaUpdateComponent } from './categorias/categoria-update/categoria-update.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ComercializacionComponent } from './pages/comercializacion/comercializacion.component';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { VentasListarComponent } from './ventas/ventas-listar/ventas-listar.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'comercializacion', component: ComercializacionComponent },
  { path: 'terminos', component: TerminosComponent },
  { path: 'consulta', component: ConsultaComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rutas para productos
  {
    path: 'productos',
    canActivate: [authGuard],
    children: [
      { path: '', component: ProductoListComponent },
      { path: ':id/detail', component: ProductoDetailComponent },
      { path: 'new', component: ProductoUpdateComponent },
      { path: ':id/edit', component: ProductoUpdateComponent },
    ],
  },

  // Rutas para categorías
  {
    path: 'categorias',
    canActivate: [authGuard],
    children: [
      { path: '', component: CategoriaListComponent },
      { path: ':id/detail', component: CategoriaDetailComponent },
      { path: 'new', component: CategoriaUpdateComponent },
      { path: ':id/edit', component: CategoriaUpdateComponent },
    ],
  },

  // Rutas para Ventas
  {
    path: 'ventas',
    canActivate: [authGuard],
    children: [
      { path: '', component: VentasListarComponent },
    ],
  },

  { path: 'carrito', component: CarritoComponent },

  // Rutas de administración
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },

  // Ruta de no autorizado
  { path: 'unauthorized', component: UnauthorizedComponent },
];
