import { Component, OnInit } from '@angular/core';
import { ICategoria } from '../categoria.model';
import { faEye, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../auth.service';
import { CategoriasService } from '../../categorias/categorias.service';
import { combineLatest } from 'rxjs';
import { ProductosService } from '../../productos/productos.service';
import { IProducto } from '../../productos/producto.model';
import { CategoriaSearchComponent } from '../categoria-search/categoria-search.component';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CategoriaSearchComponent,
    FontAwesomeModule,
  ],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent implements OnInit {
  productos?: Array<IProducto>;
  categorias?: Array<ICategoria>;
  filteredCategoria: Array<ICategoria> = [];
  isAdmin = false;

  faPlus = faPlus;
  faEye = faEye;
  faPencil = faPen;
  faTrash = faTrash;

  constructor(
    private productoService: ProductosService,
    private categoriaService: CategoriasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const categorias$ = this.categoriaService.listar();
    const productos$ = this.productoService.listar();
    this.isAdmin = this.authService.isAdmin();

    combineLatest([categorias$, productos$]).subscribe(
      ([categorias, productos]) => {
        this.categorias = categorias;
        this.productos = productos;
        this.filteredCategoria = categorias;
      }
    );
  }

  onDelete(categoria: ICategoria): void {
    if (confirm(`¿Estás seguro de eliminar categoria ${categoria.name} ?`)) {
      console.log('Eliminar categoria', categoria.id!);
      this.categoriaService.eliminar(categoria.id!).subscribe((response) => {
        console.log('Categoria eliminado', response);
        this.categorias = this.categorias?.filter((p) => p.id !== categoria.id!);
      });
    } else {
      console.log('Cancelar eliminación');
    }
  }

  aplicarFiltroCategorias(categorias: Array<ICategoria>): void {
    this.filteredCategoria = categorias;
  }

  getNombreCategoria(id: number): string {
    const categoria = this.categorias?.find((c: ICategoria) => c.id === id);
    return categoria ? categoria.name : 'No definida';
  }

}
