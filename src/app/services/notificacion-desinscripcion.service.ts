import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {InscripcionDTO} from "../model/DTOS/InscripcionDTO";
import {Observable} from "rxjs";
import {Respuesta} from "../model/respuesta";
import {NotificacionDesinscripcion} from "../model/NotificacionDesinscripcion";
import {NotificacionDesinscripcionDTO} from "../model/DTOS/NotificacionDesinscripcionDTO";

@Injectable({
  providedIn: 'root'
})
export class NotificacionDesinscripcionService {

  constructor(private httpClient: HttpClient) { }

  getNotificacionesDesinscripcionActivas(): Observable<NotificacionDesinscripcion[]>{
    return this.httpClient.get<NotificacionDesinscripcion[]>('notificacionesDesinscripcion/findActivos/');
  }

  guardarNtificacionDsinscripcion(notificacionDEsinscripcionDTO: NotificacionDesinscripcionDTO): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>('notificacionesDesinscripcion/guardar/' , notificacionDEsinscripcionDTO);
  }
}
