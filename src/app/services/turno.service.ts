import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Turno} from '../model/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private httpClient: HttpClient) { }

  getTurno(): Observable<Turno[]> {
    return this.httpClient.get<Turno[]>('/turno');
  }
}
