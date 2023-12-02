import { Injectable } from '@angular/core';
import {Store} from "@ngxs/store";
import {HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthState} from "../state/states/auth.state";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private store: Store) {
  }

  armarHttpRequest(req: HttpRequest<any>) {
    return req.clone({
      url: environment.serverUrl + req.url,
      headers: this.setHeader(req.url),
      body: req.body,
      withCredentials: true,
    });
  }

  private setHeader(url: string) {
    const headerBasicFormEnconded = url.includes('auth/reenviarActivacionCuenta/')
        || url.includes('oauth/token') || url.includes('auth/olvideMiClave/');


    let headers: HttpHeaders = new HttpHeaders();

    // Seteo header segun la url que se recibe.
    if (headerBasicFormEnconded) {
      headers = headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
          .set('Authorization', 'Basic ' + btoa('client:password'));
    } else {
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    }

    // Si estoy autenticado y no tengo que cambiar el contentType agrego el token a la peticion.
    const estoyAutenticado = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (estoyAutenticado && !headerBasicFormEnconded) {
      headers = headers.append('Authorization', 'Bearer ' + this.getAccessToken())
    }

    // parche para la subida de archivos
    if (url.includes('resources/fotoPerfil')) {
      headers = headers.delete('Content-Type');
    }

    return headers;
  }

  private getAccessToken() {
    const token = this.store.selectSnapshot(AuthState.token);
    return token != null ? token : '';
  }
}
