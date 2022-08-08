import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from '../../model/Usuario';
import {SetCursoAction} from "../../state/states/curso.state";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {SetUsuarioAction} from "../../state/states/usuario.state";

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss'],
})
export class TablaUsuariosComponent implements OnInit {
  @Input() usuarios: Usuario[];
  @Input() tipo: string
  constructor(
      private store: Store,
      private router: Router
  ) { }

  ngOnInit() {}

  modificar(usuario: Usuario) {
    this.store.dispatch(new SetUsuarioAction(usuario));
    if (this.tipo === "alumno") {
      this.router.navigate(['administrar/alumnos/crear-modificar-alumno'], { replaceUrl: true });
    }
    else {
      this.router.navigate(['administrar/administrativos/crear-modificar-administrativo'], { replaceUrl: true });
    }
  }
}
