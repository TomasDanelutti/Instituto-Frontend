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
import {SweetAlertResult} from "sweetalert2";

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
    this.messagesService.showtAlert('Atención', `¿Desea inscribirse al curso?`, () => {
      this.inscripcionService.inscribirse(this.inscripcion.value).subscribe(value => {
        this.store.dispatch(new SetCursosInscriptos(this.usuario.idUsuario));
        this.store.dispatch(new SetCursosNoInscriptos(this.usuario.idUsuario));
        this.messagesService.ventanaExitosa('Éxito', 'Inscripcion realizada con exito');
      }, error => {
        this.messagesService.ventanaError('Atención', 'No se pudo inscribir al curso');
      });
    });
  }

  modificar(curso: Curso) {
    this.store.dispatch(new SetCursoAction(curso));
    this.router.navigate(['administrar/cursos/crear-modificar-curso'], { replaceUrl: true });
  }

  eliminar(curso: Curso) {
    this.messagesService.ventanaConfirmar('Atención', `¿Desea eliminar el curso  ${curso.nombre}?`)
        .then((result: SweetAlertResult) => {
          if (result.isConfirmed) {
            this.cursoService.eliminarCurso(curso).subscribe(value => {
              this.messagesService.ventanaConfirmar('Éxito', 'Curso eliminado con exito');
            }, error => {
              this.messagesService.ventanaError('Atención', 'No se pudo eliminar el curso');
            });
          }
    });
  }
}
