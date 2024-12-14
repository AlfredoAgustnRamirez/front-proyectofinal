import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoria } from './categoria.model';
import { ENDPOINTS } from '../shared/endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  constructor(private httpClient: HttpClient) {}

  listar(): Observable<Array<ICategoria>> {
    return this.httpClient.get<Array<ICategoria>>(
      `${ENDPOINTS.apiUrl}/Categories`
    );
  }

  detalle(id: number): Observable<ICategoria> {
    return this.httpClient.get<ICategoria>(
      `${ENDPOINTS.apiUrl}/Categories/${id}`
    );
  }

  crear(categoria: ICategoria): Observable<ICategoria> {
    // Eliminamos el id para no informar NULL a la API que da error.
    // * Lo ideal sería controlar esto en el formulario del componente
    delete categoria.id;
    return this.httpClient.post<ICategoria>(
      `${ENDPOINTS.apiUrl}/Categories`,
      categoria
    );
  }

  actualizar(categoria: ICategoria): Observable<ICategoria> {
    return this.httpClient.put<ICategoria>(
      `${ENDPOINTS.apiUrl}/Categories/${categoria.id}`,
      categoria
    );
  }

  eliminar(id: number): Observable<ICategoria> {
    return this.httpClient.delete<ICategoria>(
      `${ENDPOINTS.apiUrl}/Categories/${id}`
    );
  }
}
