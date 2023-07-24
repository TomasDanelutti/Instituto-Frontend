import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }


  getUsuarioByDni(dni: number): Observable<String>{
    return this.httpClient.get<String>('usuarios/findBy/' + dni);
  }
}
