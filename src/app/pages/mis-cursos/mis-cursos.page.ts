import { Component, OnInit } from '@angular/core';
import {Select} from "@ngxs/store";
import {UsuarioLogueadoState} from "../../state/states/usuarioLogueado.state";
import {Observable} from "rxjs";
import {Curso} from "../../model/Curso";
import {CursosService} from "../../services/cursos.service";
import {Usuario} from "../../model/Usuario";

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.page.html',
  styleUrls: ['./mis-cursos.page.scss'],
})
export class MisCursosPage implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueadoState: Observable<Usuario>;
  cursosInscriptos: Curso[] = [];
  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    this.usuarioLogueadoState.subscribe(usuarioState => {
      this.cursosService.getCursoInscriptosByUsuario(usuarioState.idUsuario)
          .subscribe(cursos => this.cursosInscriptos = cursos);
    })
  }
}
