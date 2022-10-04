import {Component, Input, OnInit} from '@angular/core';
import {Curso} from '../../model/Curso';
import {SetCursosInscriptos, SetCursosNoInscriptos, UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {MessagesService} from '../../services/messages.service';
import {Select, Store} from '@ngxs/store';
import {InscripcionService} from '../../services/inscripcion.service';
import {Observable} from 'rxjs';
import {Usuario} from '../../model/Usuario';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lista-cursos-inscriptos',
  templateUrl: './lista-cursos-inscriptos.component.html',
  styleUrls: ['./lista-cursos-inscriptos.component.scss'],
})
export class ListaCursosInscriptosComponent implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueado: Observable<Usuario>;
  @Input() cursos: Curso[];
  usuario: Usuario;
  displayDialog = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.usuarioLogueado.subscribe(value => this.usuario = value);
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
