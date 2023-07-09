import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {Empleado} from "../model/Empleado";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private httpClient: HttpClient) { }

  getEmpleadosPaginados(pageNo: number, pageSize: number, nombre?: string): Observable<Empleado[]>{
    let queryParams = new HttpParams()
        .set('pageNo', pageNo.toString())
        .set('pageSize', pageSize.toString());
    if (typeof nombre !== 'undefined' && nombre !== null) {
      queryParams = queryParams.set('nombre', nombre);
    }
    return this.httpClient.get<Empleado[]>('empleados/getEmpleadosPaginado', {params: queryParams});
  }

  contarEmpleados(nombre?: string): Observable<number>{
    let queryParams = new HttpParams()
    if (typeof nombre !== 'undefined' && nombre !== null) {
      queryParams = queryParams.set('nombre', nombre);
    }
    return this.httpClient.get<number>('empleados/count');
  }

  getEmpleadosByNombre(nombre: string): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>('empleados/findByNombre/' + nombre);
  }

  getEmpleadosByPuesto(puesto: string): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>('empleados/findByPuesto/' + puesto);
  }

  guardarEmpleado(administrativo: Empleado): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('empleados/guardar', administrativo);
  }

}
