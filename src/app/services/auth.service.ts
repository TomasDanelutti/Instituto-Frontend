import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {HttpClient} from "@angular/common/http";
import {SolicitudGenerarClave} from "../model/SolicitudGenerarClave";
import {Persona} from "../model/Persona";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  olvideMiClave(dni: number): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('auth/olvideMiClave' , dni);
  }

  getUsuarioByUuid(uuid: string): Observable<Persona>{
    return this.httpClient.get<Persona>('auth/findBy/' + uuid);
  }

  cambiarClave(solicitudGenerarClave: SolicitudGenerarClave): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('auth/cambiarClave' , solicitudGenerarClave);
  }
}
