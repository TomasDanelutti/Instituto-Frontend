import {Component, Input, OnInit} from '@angular/core';
import {Curso} from '../../../model/Curso';
import {UsuarioLogueadoState} from '../../../state/states/usuarioLogueado.state';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Persona} from "../../../model/Persona";

@Component({
  selector: 'app-lista-cursos-inscriptos',
  templateUrl: './lista-cursos-inscriptos.component.html',
  styleUrls: ['./lista-cursos-inscriptos.component.scss'],
})
export class ListaCursosInscriptosComponent implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueado: Observable<Persona>;
  @Input() cursos: Curso[];
  persona: Persona;
  displayDialog = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.usuarioLogueado.subscribe(value => this.persona = value);
  }

  verAlumnos(curso: Curso) {

  }

  verProfesor(curso: Curso) {
    this.displayDialog = true;
    console.log(curso)
  }

  aulaVirtual(curso: Curso) {

  }

  switchDialogConsultaVistaPrevia(display:boolean){
    this.displayDialog = display;
  }

}
