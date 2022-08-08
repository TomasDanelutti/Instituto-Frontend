import {Component, Input, OnInit} from '@angular/core';
import {Curso} from '../../model/Curso';
import {Router} from '@angular/router';
import {MessagesService} from '../../services/messages.service';
import {CursosService} from '../../services/cursos.service';
import {InscripcionService} from '../../services/inscripcion.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Usuario} from '../../model/Usuario';
import {SetCursosInscriptos, SetCursosNoInscriptos, UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {SetCursoAction} from "../../state/states/curso.state";

@Component({
  selector: 'app-tabla-cursos',
  templateUrl: './tabla-cursos.component.html',
  styleUrls: ['./tabla-cursos.component.scss'],
})
export class TablaCursosComponent implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueado: Observable<Usuario>;
  @Input() cursos: Curso[];
  inscripcion: FormGroup;
  usuario: Usuario;
  constructor(
      private router: Router,
      private messagesService: MessagesService,
      private cursoService: CursosService,
      private inscripcionService: InscripcionService,
      private formBuilder: FormBuilder,
      private store: Store) { }

  ngOnInit() {
    this.usuarioLogueado.subscribe(value => this.usuario = value);
    this.inscripcion = this.formBuilder.group({
      idInscripcion: [],
      usuario: [],
      curso: [],
    });
  }

  inscribirse(curso: Curso) {
    this.inscripcion.controls.usuario.setValue(this.usuario);
    this.inscripcion.controls.curso.setValue(curso);
    this.messagesService.showAlert('Atención', `¿Desea inscribirse al curso?`, () => {
      this.inscripcionService.inscribirse(this.inscripcion.value).subscribe(value => {
        this.store.dispatch(new SetCursosInscriptos(this.usuario.idUsuario));
        this.store.dispatch(new SetCursosNoInscriptos(this.usuario.idUsuario));
        this.messagesService.showMessage('Éxito', 'Inscripcion realizada con exito', 5000);
      }, error => {
        this.messagesService.showMessage('Atención', 'No se pudo inscribir al curso', 5000);
      });
    });
  }

  modificar(curso: Curso) {
    this.store.dispatch(new SetCursoAction(curso));
    this.router.navigate(['administrar/cursos/crear-modificar-curso'], { replaceUrl: true });
  }

  eliminar(curso: Curso) {
    this.messagesService.showAlert('Atención', `¿Desea eliminar el curso  ${curso.nombre}?`, () => {
      this.cursoService.eliminarCurso(curso).subscribe(value => {
        this.messagesService.showMessage('Éxito', 'Curso eliminado con exito', 5000);
      }, error => {
        this.messagesService.showMessage('Atención', 'No se pudo eliminar el curso', 5000);
      });
    });
  }
}
