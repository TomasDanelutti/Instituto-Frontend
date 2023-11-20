import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {Desinscripcion} from "../model/Desinscripcion";

@Injectable({
  providedIn: 'root'
})
export class DesinscripcionService {

  constructor(private httpClient: HttpClient) {
  }

  getDesinscripcionesActivas(): Observable<Desinscripcion[]> {
    return this.httpClient.get<Desinscripcion[]>('desinscripciones/findActivos/');
  }

  contarDesinscripciones(): Observable<number> {
    return this.httpClient.get<number>('desinscripciones/count');
  }

  guardarDesinscripcion(idCurso: number, idAlumno: number, motivo: string, token: string): Observable<Respuesta> {
    let queryParams = new HttpParams();
    if (typeof idCurso !== 'undefined' && idCurso !== null) {
      queryParams = queryParams.set('idCurso', idCurso);
    }
    if (typeof idAlumno !== 'undefined' && idAlumno !== null) {
      queryParams = queryParams.set('idAlumno', idAlumno);
    }
    if (typeof motivo !== 'undefined' && motivo !== null) {
      queryParams = queryParams.set('motivo', motivo);
    }
    if (typeof token !== 'undefined' && token !== null) {
      queryParams = queryParams.set('token', token);
    }
    const options = { params: queryParams };  // Agregar los parámetros a la opción de la solicitud
    return this.httpClient.post<Respuesta>('desinscripciones/guardar/', null, options);
  }

  getTokenDesinscripcion(idCurso: number, idAlumno: number, motivo: string): Observable<Respuesta> {
    let queryParams = new HttpParams();
    if (typeof idCurso !== 'undefined' && idCurso !== null) {
      queryParams = queryParams.set('idCurso', idCurso.toString());
    }
    if (typeof idAlumno !== 'undefined' && idAlumno !== null) {
      queryParams = queryParams.set('idAlumno', idAlumno.toString());
    }
    if (typeof motivo !== 'undefined' && motivo !== null) {
      queryParams = queryParams.set('motivo', motivo);
    }

    const options = { params: queryParams };

    return this.httpClient.post<Respuesta>('desinscripciones/getToken/', null, options);
  }


  cancelarDesinscripcion(idAlumno: number, idEmpleado: number, idCurso: number, motivo: string): Observable<Respuesta> {
    let queryParams = new HttpParams();
    if (typeof idCurso !== 'undefined' && idCurso !== null) {
      queryParams = queryParams.set('idCurso', idCurso.toString());
    }
    if (typeof idAlumno !== 'undefined' && idAlumno !== null) {
      queryParams = queryParams.set('idAlumno', idAlumno.toString());
    }
    if (typeof idEmpleado !== 'undefined' && idEmpleado !== null) {
      queryParams = queryParams.set('idEmpleado', idEmpleado.toString());
    }
    if (typeof motivo !== 'undefined' && motivo !== null) {
      queryParams = queryParams.set('motivo', motivo);
    }

    const options = { params: queryParams };
    return this.httpClient.post<Respuesta>('desinscripciones/cancelar/', null, options);
  }
}
