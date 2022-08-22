import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../model/Usuario';
import {Curso} from '../model/Curso';
import {Respuesta} from '../model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>('/curso');
  }

  getCursoInscriptosByUsuario(idUsuario: number): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>('/curso/findInscriptos/' + idUsuario);
  }

  getCursoNoInscriptosByUsuario(idUsuario: number): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>('/curso/findNoInscriptos/' + idUsuario);
  }

  getCursoByNombre(nombre: string): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>('/curso/findByNombre/' + nombre);
  }

  guardarCurso(curso: Curso): Observable<Respuesta<string>> {
    return this.httpClient.post<Respuesta<string>>('/curso/guardar', curso);
  }

  eliminarCurso(curso: Curso): Observable<Respuesta<string>> {
    return this.httpClient.post<Respuesta<string>>('/curso/eliminar', curso);
  }

}
