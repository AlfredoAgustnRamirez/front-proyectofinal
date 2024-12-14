import { Component } from '@angular/core';
import { VentasService } from '../ventas.service';
import { AuthService } from '../../auth.service';
import {
  faEye,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IVenta } from '../venta.interface';


@Component({
  selector: 'app-listar-ventas',
  standalone: true,
  imports: [CommonModule,RouterModule,FontAwesomeModule],
  templateUrl: './ventas-listar.component.html',
  styleUrl: './ventas-listar.component.css'
})
export class VentasListarComponent {
  ventas?: Array<IVenta>;
  isAdmin = false;
  faPlus = faPlus;
  faEye = faEye;
  faPencil = faPen;
  faTrash = faTrash;

  constructor(
    private ventasServices: VentasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Aquí te suscribes al observable y asignas las ventas a la propiedad 'ventas'
    this.ventasServices.listar().subscribe((data) => {
      this.ventas = data; // Asigna los datos recibidos a la propiedad ventas
    });

    // Verifica si el usuario es administrador
    this.isAdmin = this.authService.isAdmin();
  }
}
