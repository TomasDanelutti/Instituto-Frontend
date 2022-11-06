import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotificacionDesinscripcionService} from "../../../services/notificacion-desinscripcion.service";
import {NotificacionDesinscripcion} from "../../../model/NotificacionDesinscripcion";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {SetUsuarioAction} from "../../../state/states/usuario.state";

@Component({
  selector: 'app-dialog-solicitudes-desinscripcion',
  templateUrl: './dialog-solicitudes-desinscripcion.component.html',
  styleUrls: ['./dialog-solicitudes-desinscripcion.component.scss'],
})
export class DialogSolicitudesDesinscripcionComponent implements OnInit {
  @Output() showDialogConsultaSolicitudesDsinscripcion = new EventEmitter<boolean>();
  display: boolean = false;
  notificaciones: NotificacionDesinscripcion[];
  constructor(
      private notificacionDesinscripcionService: NotificacionDesinscripcionService,
      private router: Router,
      private store: Store) { }

  ngOnInit() {
    this.display = true;
    this.notificacionDesinscripcionService.getNotificacionesDesinscripcionActivas().subscribe(value => this.notificaciones = value);
  }

  hideDialogSolicitudesDesinscripcion() {
    this.showDialogConsultaSolicitudesDsinscripcion.emit(false);
  }

  navegarDesinscribir(notificacion: NotificacionDesinscripcion) {
    this.store.dispatch(new SetUsuarioAction(notificacion.alumno));
    this.showDialogConsultaSolicitudesDsinscripcion.emit(false);
    this.router.navigate(['administrar/alumnos/crear-modificar-alumno']);
  }
}
