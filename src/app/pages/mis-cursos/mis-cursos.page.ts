import { Component, OnInit } from '@angular/core';
import {Select} from "@ngxs/store";
import {UsuarioLogueadoState} from "../../state/states/usuarioLogueado.state";
import {Observable} from "rxjs";
import {Curso} from "../../model/Curso";
import {CursosService} from "../../services/cursos.service";
import {Persona} from "../../model/Persona";

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.page.html',
  styleUrls: ['./mis-cursos.page.scss'],
})
export class MisCursosPage implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueadoState: Observable<Persona>;
  cursosInscriptos: Curso[] = [];
  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    this.cursosService.getCursosByPersonaAndNombre(0, 100, true).subscribe(value => {
      this.cursosInscriptos = value;
      console.log(value)
    });
  }
}
