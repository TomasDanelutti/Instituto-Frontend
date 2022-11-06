import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {Empleado} from "../model/Empleado";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private httpClient: HttpClient) { }

  getEmpleadosPaginados(numeroPagina: number, cantSubareas: number): Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>('empleados/findBy/' + numeroPagina + '/' + cantSubareas);
  }

  contarEmpleados(): Observable<number>{
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
