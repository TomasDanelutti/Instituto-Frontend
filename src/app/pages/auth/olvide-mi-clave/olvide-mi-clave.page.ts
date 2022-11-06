import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MessagesService} from "../../../services/messages.service";
import {AuthService} from "../../../services/auth.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-olvide-mi-clave',
  templateUrl: './olvide-mi-clave.page.html',
  styleUrls: ['./olvide-mi-clave.page.scss'],
})
export class OlvideMiClavePage implements OnInit {

  btnAceptarTxt: string;
  disableBtnAceptar: boolean;
  dni: FormControl = new FormControl();

  constructor(
      private router: Router,
      private messagesService: MessagesService,
      private authService: AuthService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.btnAceptarTxt = 'Recuperar clave';
    this.disableBtnAceptar = false;
  }

  olvideMiClave() {
    this.disableBtnAceptar = true;
    this.btnAceptarTxt = 'Procesando';

    this.authSolicitarClave();
  }

  authSolicitarClave() {
    this.authService.olvideMiClave(this.dni.value)
        .subscribe(respuesta => {
          this.disableBtnAceptar = false;
          this.btnAceptarTxt = 'Recuperar clave';
          this.dni.reset();
          this.messagesService.ventanaExitosa('Exitó', respuesta.mensaje);
        },error => {
          this.messagesService.ventanaError("Atención", error.error);
          this.disableBtnAceptar = false;
          this.btnAceptarTxt = 'Recuperar clave';
          this.dni.reset();
        });
  }

  volver() {
    this.router.navigate(['/login']);
  }
}
