import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {Alumno} from "../model/Alumno";

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private httpClient: HttpClient) { }

  getAlumnosPaginados(numeroPagina: number, cantSubareas: number): Observable<Alumno[]>{
    return this.httpClient.get<Alumno[]>('alumno/findBy/' + numeroPagina + '/' + cantSubareas);
  }

  contarAlumnos(): Observable<number>{
    return this.httpClient.get<number>('alumno/count');
  }

  getAlumnoByNombre(nombre: string): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>('alumno/findByNombre/' + nombre);
  }

  guardarAlumno(alumno: Alumno): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('alumno/guardar', alumno);
  }
}
