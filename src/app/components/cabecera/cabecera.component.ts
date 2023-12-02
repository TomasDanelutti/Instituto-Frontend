import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {Rol} from "../../model/rol";
import {DesinscripcionState} from "../../state/states/desinscripcion.state";
import {MessagesService} from "../../services/messages.service";
import {AuthState} from "../../state/states/auth.state";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent {
  @Select(AuthState.isAuthenticated) isAuthenticated: Observable<boolean>;
  @Select(DesinscripcionState.getCantDesinscripciones) cantDesinscripcionesState: Observable<number>;
  @Select(UsuarioLogueadoState.getRol) rolState: Observable<Rol>;
  cantDesinscripciones: number;
  dialogSolicitudesDesinscripcion = false;
  constructor(
      private router: Router,
      private messagesService: MessagesService) { }

  navegarHome() {
    this.router.navigate(['home']);
  }

  navegarMiPerfil() {
    this.router.navigate(['mi-perfil']);
  }

  openDialog() {
    if (this.cantDesinscripciones > 0) {
      this.dialogSolicitudesDesinscripcion = true;
    }
    else {
      this.messagesService.ventanaInfo("Atención", "En este momento no hay ninguna solicitud de desinscripcion");
    }
  }

  switchDialogSolicitudesDesinscripcion(display:boolean){
    this.dialogSolicitudesDesinscripcion = display;
  }
}
