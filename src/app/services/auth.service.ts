import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../model/Usuario";
import {SolicitudGenerarClave} from "../model/SolicitudGenerarClave";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  olvideMiClave(dni: number): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('auth/olvideMiClave' , dni);
  }

  getUsuarioByUuid(uuid: string): Observable<Usuario>{
    return this.httpClient.get<Usuario>('auth/findBy/' + uuid);
  }

  cambiarClave(solicitudGenerarClave: SolicitudGenerarClave): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('auth/cambiarClave' , solicitudGenerarClave);
  }
}
