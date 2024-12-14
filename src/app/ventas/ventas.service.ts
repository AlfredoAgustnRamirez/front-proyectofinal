import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../shared/endpoints.constant';
import { IVenta } from './venta.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private httpClient: HttpClient) {}

  listar(): Observable<Array<IVenta>> {
    return this.httpClient.get<Array<IVenta>>(`${ENDPOINTS.apiUrl}/venta`);
  }

}
