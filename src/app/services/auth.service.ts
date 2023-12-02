import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SolicitudGenerarClave} from "../model/SolicitudGenerarClave";
import {Persona} from "../model/Persona";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }


  login(username: number, password: string): Observable<any> {

    const params = new URLSearchParams();
    params.append('username', username + '');
    params.append('password', password);
    params.append('grant_type', 'password');

    return this.httpClient.post('oauth/token', params.toString());
  }





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
