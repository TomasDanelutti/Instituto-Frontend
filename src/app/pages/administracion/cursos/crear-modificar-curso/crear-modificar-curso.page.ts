import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CursosService} from '../../../../services/cursos.service';
import {MessagesService} from '../../../../services/messages.service';
import {Curso} from '../../../../model/Curso';
import {ImagenService} from '../../../../services/imagen.service';
import {Select, Store} from "@ngxs/store";
import {CursoState, ResetCurso} from "../../../../state/states/curso.state";
import {Observable} from "rxjs";
import {
  SetCursosInscriptos,
  SetCursosNoInscriptos,
  UsuarioLogueadoState
} from "../../../../state/states/usuarioLogueado.state";
import {Usuario} from "../../../../model/Usuario";

@Component({
  selector: 'app-crear-modificar-curso',
  templateUrl: './crear-modificar-curso.page.html',
  styleUrls: ['./crear-modificar-curso.page.scss'],
})
export class CrearModificarCursoPage implements OnInit {
  @Select(UsuarioLogueadoState) usuarioLogueadoState: Observable<Usuario>;
  @Select(CursoState.getCurso) cursoState: Observable<Curso>;
  archivos: any = [];
  formulario: FormGroup;
  cardHeader: string;
  usuario: Usuario;
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private cursoService: CursosService,
      private messagesService: MessagesService,
      private imagenService: ImagenService,
      private store: Store) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      idCurso: [],
      nombre: [Validators.required],
      turno: [Validators.required],
      programa: [Validators.required],
      cupoMinimo: [Validators.required],
      cupoMaximo: [Validators.required],
      profesor: [Validators.required],
      imagen: []
    });
    this.usuarioLogueadoState.subscribe(value => this.usuario = value);
    this.cursoState.subscribe(curso => {
      if (curso) {
        this.formulario.patchValue(curso);
      }
      else {
        this.formulario.reset();
      }
      this.cardHeader = this.formulario.value.idCurso ? 'Modificar curso' : 'Crear curso';
    });
  }

  volver() {
    this.router.navigate(['/administrar/cursos'], {replaceUrl: true});
  }
  guardarCurso() {
    if (this.formulario.valid) {
      this.cursoService.guardarCurso(this.formulario.value).subscribe(rta => {
        const estado: string = this.formulario.value.idCurso ? 'modificado' : 'creado';
        this.messagesService.showMessage('Éxito', `Curso ${this.formulario.value.nombre} ${estado}`, 5000);
        this.store.dispatch(new SetCursosInscriptos(this.usuario.idUsuario));
        this.store.dispatch(new SetCursosNoInscriptos(this.usuario.idUsuario));
        this.router.navigate(['/administrar/cursos'], {replaceUrl: true});
      }, error => {
        this.messagesService.showMessage('Atención', 'No se pudo guardar el curso', 5000);
      });
    } else {
      this.messagesService.showMessage('Atención', 'formulario invalido', 5000);
    }
  }

  ionViewDidLeave() {
    this.formulario.reset();
    this.store.dispatch(new ResetCurso());
  }

  capturarFoto($event): any {
    const archivoCapturado = $event.target.files[0];
    this.imagenService.extraerBase64(archivoCapturado).then((value: any) => {
      this.formulario.controls.imagen.setValue(value.base);
    });
    this.archivos.push(archivoCapturado);
  }
}
