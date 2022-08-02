import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Programa} from '../model/Programa';
import {Respuesta} from '../model/respuesta';
import {Usuario} from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor(private httpClient: HttpClient) { }

  getProgramas(): Observable<Programa[]> {
    return this.httpClient.get<Programa[]>('/programa');
  }

  guardarPrograma(programa: Programa): Observable<Respuesta<string>> {
    return this.httpClient.post<Respuesta<string>>('/programa/guardar', programa);
  }

  eliminarPrograma(programa: Programa): Observable<Respuesta<string>> {
    return this.httpClient.post<Respuesta<string>>('/programa/eliminar', programa);
  }
}
