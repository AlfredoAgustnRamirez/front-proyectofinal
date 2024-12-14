import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from './producto.model';
import { ENDPOINTS } from '../shared/endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  constructor(private httpClient: HttpClient) {}

  listar(): Observable<Array<IProducto>> {
    return this.httpClient.get<Array<IProducto>>(`${ENDPOINTS.apiUrl}/Products`);
  }

  detalle(id: number): Observable<IProducto> {
    return this.httpClient.get<IProducto>(`${ENDPOINTS.apiUrl}/Products/${id}`);
  }

  crear(producto: IProducto): Observable<IProducto> {
    return this.httpClient.post<IProducto>(`${ENDPOINTS.apiUrl}/Products`, producto);
  }

  actualizar(producto: IProducto): Observable<IProducto> {
    return this.httpClient.put<IProducto>(
      `${ENDPOINTS.apiUrl}/Products/${producto.id}`,
      producto
    );
  }

  eliminar(id: number): Observable<IProducto> {
    return this.httpClient.delete<IProducto>(`${ENDPOINTS.apiUrl}/Products/${id}`);
  }
}
