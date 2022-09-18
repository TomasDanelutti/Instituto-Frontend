import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Usuario} from '../../model/Usuario';
import {UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueado: Observable<Usuario>;
  usuario: Usuario;
  rol: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.usuarioLogueado.subscribe(value => this.usuario = value);
  }

  navegarHome() {
    this.router.navigate(['home']);
  }

  navegarMiPerfil() {
    this.router.navigate(['mi-perfil']);
  }
}
