import { Component, OnInit } from '@angular/core';
import {Select} from "@ngxs/store";
import {UsuarioLogueadoState} from "../../state/states/usuarioLogueado.state";
import {Observable} from "rxjs";
import {Curso} from "../../model/Curso";

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.page.html',
  styleUrls: ['./mis-cursos.page.scss'],
})
export class MisCursosPage implements OnInit {
  @Select(UsuarioLogueadoState.getCursosInscriptos) cursosInscriptosState: Observable<Curso[]>;
  cursosInscriptos: Curso[] = [];
  constructor() { }

  ngOnInit() {
    this.cursosInscriptosState.subscribe(value => this.cursosInscriptos = value);
  }
}
