import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagesService} from 'src/app/services/messages.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {Usuario} from "../../../model/Usuario";
import {SolicitudGenerarClave} from "../../../model/SolicitudGenerarClave";

@Component({
  selector: 'app-generar-clave',
  templateUrl: './generar-clave.page.html',
  styleUrls: ['./generar-clave.page.scss'],
})
export class GenerarClavePage implements OnInit {
  uuid: string;
  usuario: Usuario = new Usuario();
  btnAceptarTxt: string;
  disableBtnAceptar: boolean;
  postulanteForm: FormGroup;

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService,
      private messagesService: MessagesService,
      private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.postulanteForm = this.formBuilder.group({
      clave: ['', Validators.required],
      repetirClave: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.btnAceptarTxt = 'Generar clave';
    this.disableBtnAceptar = false;

    // Recupero el UUID de la URL
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');

    if (this.uuid == null || this.uuid.length === 0) {

      this.messagesService.ventanaError('Atención',
          'Atención: Lo sentimos, pero hubo un inconveniente en la recuperación de tu cuenta. ' +
          'Por favor, comunicate con bedelia ');
      return false;
    }

    this.authService.getUsuarioByUuid(this.uuid)
        .subscribe((usuario) => {
          this.usuario = usuario;
        },error => this.messagesService.ventanaError('Atención', error.error));
  }

  validateClaves() {
    if (this.postulanteForm.controls.clave.value !== this.postulanteForm.controls.repetirClave.value) {
      this.messagesService.ventanaError('Error', 'Las claves no coinciden');
      return false;
    } else {
      return true;
    }
  }

  generarClave() {
    if (this.validateClaves()) {
      this.btnAceptarTxt = 'Procesando';
      this.disableBtnAceptar = true;
      let solicitudCambiarClave = new SolicitudGenerarClave();
      solicitudCambiarClave.dni = this.usuario.dni;
      solicitudCambiarClave.clave = this.postulanteForm.controls.clave.value;
      this.authService.cambiarClave(solicitudCambiarClave).subscribe(respuesta => {
        this.messagesService.ventanaExitosa("Exitó", respuesta.mensaje);
        this.btnAceptarTxt = 'Generar clave';
        this.disableBtnAceptar = false;
      },error => {
        this.messagesService.ventanaError("Atención", error.error);
        this.btnAceptarTxt = 'Generar clave';
        this.disableBtnAceptar = false;
      })
      this.postulanteForm.reset();
    }
  }

  ionViewWillLeave() {
    this.postulanteForm.reset();
  }

  volver() {
    this.router.navigate(['/login']);
  }
}
