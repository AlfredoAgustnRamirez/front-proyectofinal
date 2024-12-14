import { Component } from '@angular/core';
import { ICategoria } from '../categoria.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriasService } from '../categorias.service';
import { CommonModule } from '@angular/common';
import { BarRating } from 'ngx-bar-rating';

@Component({
  selector: 'app-categoria-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './categoria-update.component.html',
  styleUrl: './categoria-update.component.css'
})
export class CategoriaUpdateComponent {
  categoria?: ICategoria | undefined;
  categorias: Array<ICategoria> = [];

  form: FormGroup = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriasService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');

    this.categoriaService
      .listar()
      .subscribe((categorias: Array<ICategoria>) => {
        this.categorias = categorias;
      });

    if (Number(id) > 0) {
      this.categoriaService
        .detalle(Number(id))
        .subscribe((categoria: ICategoria) => {
          this.categoria = categoria;

          this.form.setValue({
            id: categoria.id,
            name: categoria.name,
          });
        });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const categoria: ICategoria = this.form.value;
  
      console.log('Formulario válido', categoria);
  
      if (categoria.id) {
        // Si 'id' existe, es una actualización
        console.log('Actualizando categoría con id', categoria.id);
        this.categoriaService
          .actualizar(categoria)
          .subscribe((categoria: ICategoria) => {
            console.log('Categoría actualizada', categoria);
            this.router.navigate(['/home']);  // Redirige a la página principal después de la actualización
          });
      } else {
        // Si no tiene 'id', es una creación
        console.log('Creando categoría');
        this.categoriaService
          .crear(categoria)
          .subscribe((categoria: ICategoria) => {
            console.log('Categoría creada', categoria);
            this.router.navigate(['/home']);  // Redirige a la página principal después de la creación
          });
      }
    } else {
      console.log('Formulario no válido');
    }
  }
  
  
}
