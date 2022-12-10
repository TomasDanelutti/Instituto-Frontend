import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Usuario} from '../../model/Usuario';
import {UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {Rol} from "../../model/rol";
import {DesinscripcionState} from "../../state/states/desinscripcion.state";
import {MessagesService} from "../../services/messages.service";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueado: Observable<Usuario>;
  @Select(UsuarioLogueadoState.getRol) rolState: Observable<Rol>;
  @Select(DesinscripcionState.getCantDesinscripciones) cantDesinscripcionesState: Observable<number>;
  usuario: Usuario;
  rol: Rol;
  cantDesinscripciones: number;
  dialogSolicitudesDesinscripcion = false;
  constructor(
      private router: Router,
      private messagesService: MessagesService) { }

  ngOnInit() {
    this.rolState.subscribe(rolState => this.rol = rolState);
    this.usuarioLogueado.subscribe(value => this.usuario = value);
    this.cantDesinscripcionesState.subscribe(value => this.cantDesinscripciones = value);
  }

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
