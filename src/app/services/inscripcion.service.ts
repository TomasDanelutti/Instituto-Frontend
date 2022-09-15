import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Curso} from '../model/Curso';
import {HttpClient} from '@angular/common/http';
import {Respuesta} from '../model/respuesta';
import {Usuario} from '../model/Usuario';
import {Inscripcion} from '../model/Inscripcion';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  constructor(private httpClient: HttpClient) { }

  inscribirse(inscripcion: Inscripcion): Observable<Respuesta<string>> {
    return this.httpClient.post<Respuesta<string>>('inscripcion/insc/' , inscripcion);
  }

  login(dni: string, clave: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>('login/' + dni + '/' + clave);
  }

  getCursosInscriptosByUsuario(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>('inscripcion/');
  }

  getCursosNoInscriptosByUsuario(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>('http://localhost:8081/inscripcion/');
  }
}
