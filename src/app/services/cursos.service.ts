import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Curso} from '../model/Curso';
import {Respuesta} from '../model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) { }

  getCursosPaginado(pageNo: number, pageSize: number, nombre?: string): Observable<Curso[]>{
    let queryParams = new HttpParams()
        .set('pageNo', pageNo.toString())
        .set('pageSize', pageSize.toString());
    if (typeof nombre !== 'undefined' && nombre !== null) {
      queryParams = queryParams.set('nombre', nombre);
    }
    return this.httpClient.get<Curso[]>('curso/getCursosPaginado/', {params: queryParams});
  }

  contarCursos(nombre?: string): Observable<number>{
    let queryParams = new HttpParams()
    if (typeof nombre !== 'undefined' && nombre !== null) {
      queryParams = queryParams.set('nombre', nombre);
    }
    return this.httpClient.get<number>('curso/count', {params:queryParams});
  }

  getCursoInscriptosByUsuario(idUsuario: number): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>('curso/findInscriptos/' + idUsuario);
  }

  getCursoNoInscriptosByUsuario(idUsuario: number): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>('curso/findNoInscriptos/' + idUsuario);
  }

  guardarCurso(curso: Curso): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('curso/guardar', curso);
  }

  eliminarCurso(idCurso: number): Observable<void> {
    return this.httpClient.delete<void>('curso/' + idCurso);
  }


}
