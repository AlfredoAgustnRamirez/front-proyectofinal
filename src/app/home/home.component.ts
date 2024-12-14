import { Component, OnInit } from '@angular/core';
import { ProductoGrillaComponent } from '../productos/producto-grilla/producto-grilla.component';
import { PrincipalComponent } from "../layout/principal/principal.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductoGrillaComponent, PrincipalComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
