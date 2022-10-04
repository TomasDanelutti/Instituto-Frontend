import {Component, Input, OnInit} from '@angular/core';
import {Datos} from "../../pages/lista-cursos/lista-cursos.page";
import {Curso} from "../../model/Curso";

@Component({
  selector: 'app-tabla-lista-cursos',
  templateUrl: './tabla-lista-cursos.component.html',
  styleUrls: ['./tabla-lista-cursos.component.scss'],
})
export class TablaListaCursosComponent implements OnInit {
  @Input() cursos: Datos[] = []
  constructor() { }

  ngOnInit() {}

  inscribirse(curso: Curso) {

  }

  desinscribirse(curso: Curso) {

  }
}
