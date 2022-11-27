import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {Desinscripcion} from "../model/Desinscripcion";
import {DesinscripcionDTO} from "../model/DTOS/DesinscripcionDTO";

@Injectable({
  providedIn: 'root'
})
export class DesinscripcionService {

  constructor(private httpClient: HttpClient) {
  }

  getDesinscripcionesActivas(): Observable<Desinscripcion[]> {
    return this.httpClient.get<Desinscripcion[]>('desinscripciones/findActivos/');
  }

  contarDesinscripciones(): Observable<number> {
    return this.httpClient.get<number>('desinscripciones/count');
  }

  guardarDesinscripcion(desinscripcionDTO: DesinscripcionDTO): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('desinscripciones/guardar/', desinscripcionDTO);
  }

  getToken(desinscripcionDTO: DesinscripcionDTO): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('desinscripciones/getToken/', desinscripcionDTO);
  }

  cancelarDesinscripcion(desinscripcionDTO: DesinscripcionDTO): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('desinscripciones/cancelar/', desinscripcionDTO);
  }
}
