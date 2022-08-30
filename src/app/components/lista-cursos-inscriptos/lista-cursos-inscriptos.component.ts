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
  selector: 'app-vista-cursos',
  templateUrl: './vista-cursos.component.html',
  styleUrls: ['./vista-cursos.component.scss'],
})
export class VistaCursosComponent implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueado: Observable<Usuario>;
  @Input() cursos: Curso[];
  @Input() insc = true;
  @Input() home = false;
  usuario: Usuario;
  inscripcion: FormGroup;
  constructor(private messagesService: MessagesService,
              private store: Store,
              private inscripcionService: InscripcionService,
              private formBuilder: FormBuilder,
              private router: Router) { }

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
        this.messagesService.showMessage('Éxito', 'Inscripcion realizada con exito', 5000);
        this.store.dispatch(new SetCursosInscriptos(this.usuario.idUsuario));
        this.store.dispatch(new SetCursosNoInscriptos(this.usuario.idUsuario));
      }, error => {
        this.messagesService.showMessage('Atención', 'No se pudo inscribir al curso', 5000);
      });
    });
  }

  masInformacion() {
    this.router.navigate(['/cursos'], { replaceUrl: true });
  }
}
