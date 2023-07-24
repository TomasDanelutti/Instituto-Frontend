import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Persona} from "../model/Persona";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  login(dni: string, clave: string): Observable<Persona> {
    return this.httpClient.get<Persona>('login/' + dni + '/' + clave);
  }
}
