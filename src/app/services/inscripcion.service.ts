import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Respuesta} from '../model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  constructor(private httpClient: HttpClient) { }

  inscribirse(idCurso: number, idPersona: number): Observable<Respuesta> {
    let queryParams = new HttpParams();
    if (typeof idCurso !== 'undefined' && idCurso !== null) {
      queryParams = queryParams.set('idCurso', idCurso);
    }
    if (typeof idPersona !== 'undefined' && idPersona !== null) {
      queryParams = queryParams.set('idPersona', idPersona);
    }
    const options = { params: queryParams };
    return this.httpClient.post<Respuesta>('inscripcion/inscribirse/' , null, options);
  }

  desinscribirse(idCurso: number, idPersona: number): Observable<Respuesta> {
    let queryParams = new HttpParams();
    if (typeof idCurso !== 'undefined' && idCurso !== null) {
      queryParams = queryParams.set('idCurso', idCurso);
    }
    if (typeof idPersona !== 'undefined' && idPersona !== null) {
      queryParams = queryParams.set('idPersona', idPersona);
    }
    const options = { params: queryParams };
    return this.httpClient.post<Respuesta>('inscripcion/desinscribirse/', null, options);
  }
}
