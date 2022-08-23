import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../model/Usuario';
import {Respuesta} from '../model/respuesta';
import {Programa} from "../model/Programa";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  getAlumnos(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>('/usuarios/alumnos');
  }

  guardarAlumno(usuario: Usuario): Observable<Respuesta<string>> {
    return this.httpClient.post<Respuesta<string>>('/usuarios/alumnos/guardar', usuario);
  }

  getAdministrativos(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>('/usuarios/administrativos');
  }

  getAlumnosByNombre(nombre: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>('/usuarios/alumnos/findByNombre/' + nombre);
  }

  getAdministrativoByNombre(nombre: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>('/usuarios/administrativos/findByNombre/' + nombre);
  }

  guardarAdministrativo(usuario: Usuario): Observable<Respuesta<string>> {
    return this.httpClient.post<Respuesta<string>>('/usuarios/administrativos/guardar', usuario);
  }
}
