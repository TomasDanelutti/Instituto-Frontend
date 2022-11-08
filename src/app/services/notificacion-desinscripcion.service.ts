import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {Desinscripcion} from "../model/Desinscripcion";
import {NotificacionDesinscripcionDTO} from "../model/DTOS/NotificacionDesinscripcionDTO";

@Injectable({
  providedIn: 'root'
})
export class NotificacionDesinscripcionService {

  constructor(private httpClient: HttpClient) { }

  getNotificacionesDesinscripcionActivas(): Observable<Desinscripcion[]>{
    return this.httpClient.get<Desinscripcion[]>('notificacionesDesinscripcion/findActivos/');
  }

  contarNotificacionesDesinscripcion(): Observable<number>{
    return this.httpClient.get<number>('notificacionesDesinscripcion/count');
  }

  guardarNtificacionDsinscripcion(notificacionDEsinscripcionDTO: NotificacionDesinscripcionDTO): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('notificacionesDesinscripcion/guardar/' , notificacionDEsinscripcionDTO);
  }

  getToken(notificacionDEsinscripcionDTO: NotificacionDesinscripcionDTO): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('notificacionesDesinscripcion/getToken/' , notificacionDEsinscripcionDTO);
  }
}
