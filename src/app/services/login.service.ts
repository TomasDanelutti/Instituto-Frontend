import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  login(dni: string, clave: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>('login/' + dni + '/' + clave);
  }
}
