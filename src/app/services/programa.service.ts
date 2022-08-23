import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Programa} from '../model/Programa';
import {Respuesta} from '../model/respuesta';
import {Usuario} from '../model/Usuario';
import {Curso} from "../model/Curso";

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor(private httpClient: HttpClient) { }

  getProgramas(): Observable<Programa[]> {
    return this.httpClient.get<Programa[]>('/programa');
  }

  getProgramaByNombre(nombre: string): Observable<Programa[]> {
    return this.httpClient.get<Programa[]>('/programa/findByNombre/' + nombre);
  }

  guardarPrograma(programa: Programa): Observable<Respuesta<string>> {
    return this.httpClient.post<Respuesta<string>>('/programa/guardar', programa);
  }

  eliminarPrograma(programa: Programa): Observable<Respuesta<string>> {
    return this.httpClient.post<Respuesta<string>>('/programa/eliminar', programa);
  }
}
