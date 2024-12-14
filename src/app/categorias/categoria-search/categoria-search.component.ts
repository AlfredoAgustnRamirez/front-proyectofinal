import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategoria } from '../categoria.model';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../categorias/categorias.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-categoria-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria-search.component.html',
  styleUrl: './categoria-search.component.css'
})
export class CategoriaSearchComponent implements OnInit {

  @Input() categorias!: Array<ICategoria>;
  @Output() categoriasEncontrados = new EventEmitter<Array<ICategoria>>();
  filteredCategorias: Array<ICategoria> = [];
  searchText: string = '';
  categoriass?: Array<ICategoria>;

  constructor(private categoriaSerice: CategoriasService) {}

  ngOnInit(): void {
    this.filteredCategorias = this.categorias;
    this.categoriaSerice.listar().subscribe((response) => {
      this.filteredCategorias = response;
      this.categorias = response;
    });
  }

  onSearchTextChange(): void {
    this.applyFilter();
  }

  onCategoriaChange(categoria: ICategoria): void {
    if (this.isSelected(categoria)) {
      this.filteredCategorias = this.filteredCategorias.filter(
        (c) => c.id !== categoria.id
      );
    } else {
      this.filteredCategorias.push(categoria);
    }
    console.log('agrego categoria', categoria, this.filteredCategorias);

    this.applyFilter();
  }

  applyFilter(): void {
    const term = this.searchText.toLowerCase();
    this.filteredCategorias = this.categorias.filter((categoria: ICategoria) => {
      return categoria.name.toLowerCase().includes(term);
    });
    this.categoriasEncontrados.emit(this.filteredCategorias);
  }

  isSelected(categoria: ICategoria): boolean {
    return this.filteredCategorias.includes(categoria);
  }
}
