import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {Alumno} from "../model/Alumno";

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private httpClient: HttpClient) { }

  getAlumnosPaginados(pageNo: number, pageSize: number, nombre?: string): Observable<Alumno[]>{
    let queryParams = new HttpParams()
        .set('pageNo', pageNo.toString())
        .set('pageSize', pageSize.toString());
    if (typeof nombre !== 'undefined' && nombre !== null) {
      queryParams = queryParams.set('nombre', nombre);
    }
    return this.httpClient.get<Alumno[]>('alumno/getAlumnosPaginado', {params: queryParams});
  }

  contarAlumnos(nombre?: string): Observable<number>{
    let queryParams = new HttpParams()
    if (typeof nombre !== 'undefined' && nombre !== null) {
      queryParams = queryParams.set('nombre', nombre);
    }
    return this.httpClient.get<number>('alumno/count', {params: queryParams});
  }

  getAlumnoByNombre(nombre: string): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>('alumno/findByNombre/' + nombre);
  }

  guardarAlumno(alumno: Alumno): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('alumno/guardar', alumno);
  }
}
