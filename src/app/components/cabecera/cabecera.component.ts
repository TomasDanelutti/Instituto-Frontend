import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Usuario} from '../../model/Usuario';
import {UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {NotificacionDesinscripcionService} from "../../services/notificacion-desinscripcion.service";
import {NotificacionDesinscripcion} from "../../model/NotificacionDesinscripcion";
import {Rol} from "../../model/rol";
import {SlideMenu} from "primeng/slidemenu";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueado: Observable<Usuario>;
  @Select(UsuarioLogueadoState.getRol) rolState: Observable<Rol>;
  usuario: Usuario;
  rol: Rol;
  notificaciones: NotificacionDesinscripcion[] = [];
  dialogSolicitudesDesinscripcion = false;
  constructor(
      private router: Router,) { }

  ngOnInit() {



    this.rolState.subscribe(rolState => this.rol = rolState);
    this.usuarioLogueado.subscribe(value => this.usuario = value);
  }

  navegarHome() {
    this.router.navigate(['home']);
  }

  navegarMiPerfil() {
    this.router.navigate(['mi-perfil']);
  }

  openDialog() {
    this.dialogSolicitudesDesinscripcion = true;
  }

  switchDialogSolicitudesDesinscripcion(display:boolean){
    this.dialogSolicitudesDesinscripcion = display;
  }
}
