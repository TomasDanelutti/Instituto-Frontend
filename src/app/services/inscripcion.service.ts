import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Respuesta} from '../model/respuesta';
import {InscripcionDTO} from "../model/DTOS/InscripcionDTO";

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  constructor(private httpClient: HttpClient) { }

  inscribirse(inscripcionDTO: InscripcionDTO): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('inscripcion/inscribirse/' , inscripcionDTO);
  }

  desinscribirse(inscripcionDTO: InscripcionDTO): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('inscripcion/desinscribirse/' , inscripcionDTO);
  }
}
