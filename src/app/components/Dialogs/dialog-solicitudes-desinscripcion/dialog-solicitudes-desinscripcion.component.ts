import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DesinscripcionService} from "../../../services/desinscripcion.service";
import {Desinscripcion} from "../../../model/Desinscripcion";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {SetUsuarioAction} from "../../../state/states/usuario.state";
import {MessagesService} from "../../../services/messages.service";
import {UsuarioLogueadoState} from "../../../state/states/usuarioLogueado.state";
import {Observable} from "rxjs";
import {SetCantDesinscripcionesAction} from "../../../state/states/desinscripcion.state";
import {Persona} from "../../../model/Persona";

@Component({
  selector: 'app-dialog-solicitudes-desinscripcion',
  templateUrl: './dialog-solicitudes-desinscripcion.component.html',
  styleUrls: ['./dialog-solicitudes-desinscripcion.component.scss'],
})
export class DialogSolicitudesDesinscripcionComponent implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioState: Observable<Persona>;
  @Output() showDialogConsultaSolicitudesDsinscripcion = new EventEmitter<boolean>();
  display: boolean = false;
  notificaciones: Desinscripcion[];
  usuario: Persona = new Persona();
  constructor(
      private desinscripcionService: DesinscripcionService,
      private router: Router,
      private store: Store,
      private messageService: MessagesService) { }

  ngOnInit() {
    this.usuarioState.subscribe(value => this.usuario = value);
    this.display = true;
    this.desinscripcionService.getDesinscripcionesActivas().subscribe(value => this.notificaciones = value);
  }

  hideDialogSolicitudesDesinscripcion() {
    this.showDialogConsultaSolicitudesDsinscripcion.emit(false);
  }

  navegarDesinscribir(notificacion: Desinscripcion) {
    this.store.dispatch(new SetUsuarioAction(notificacion.alumno));
    this.showDialogConsultaSolicitudesDsinscripcion.emit(false);
    this.router.navigate(['administrar/alumnos/crear-modificar-alumno']);
  }

  cancelarDesinscripcion(desinscricion: Desinscripcion) {
    this.messageService.ventanaVerificacionMotivo().then((motivo) => {
      if (motivo) {
        this.desinscripcionService.cancelarDesinscripcion(desinscricion.alumno.idPersona, this.usuario.idPersona, desinscricion.curso.idCurso, motivo).subscribe(respuesta => {
          this.messageService.ventanaExitosa("Exitó", respuesta.mensaje);
          this.store.dispatch(new SetCantDesinscripcionesAction());
          this.showDialogConsultaSolicitudesDsinscripcion.emit(false);
        },error => this.messageService.ventanaError("Atencion", error.error));
      }
    });
  }
}
