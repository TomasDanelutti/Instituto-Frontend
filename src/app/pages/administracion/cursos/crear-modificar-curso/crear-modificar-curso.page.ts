import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CursosService} from '../../../../services/cursos.service';
import {MessagesService} from '../../../../services/messages.service';
import {Curso} from '../../../../model/Curso';
import {ArchivoService} from '../../../../services/Archivo.service';
import {Select, Store} from "@ngxs/store";
import {CursoState, ResetCurso} from "../../../../state/states/curso.state";
import {Observable} from "rxjs";
import {Archivo} from "../../../../model/Archivo";

@Component({
  selector: 'app-crear-modificar-curso',
  templateUrl: './crear-modificar-curso.page.html',
  styleUrls: ['./crear-modificar-curso.page.scss'],
})
export class CrearModificarCursoPage implements OnInit {
  @ViewChild('fileInput')
  fileInput: ElementRef;
  @Select(CursoState.getCurso) cursoState: Observable<Curso>;
  archivos: any = [];
  formulario: FormGroup;
  cardHeader: string;
  imagen: Archivo = new Archivo();
  imagenHeader: string;
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private cursoService: CursosService,
      private messagesService: MessagesService,
      private archivoService: ArchivoService,
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
    this.cursoState.subscribe(curso => {
      if (curso) {
        this.formulario.patchValue(curso);
        this.imagen = curso.imagen;
        this.imagenHeader = curso?.imagen?.nombre;
      }
      else {
        this.imagenHeader = "Ningun archivo seleccionado"
        this.formulario.reset();
      }
      this.cardHeader = this.formulario.value.idCurso ? 'Modificar curso' : 'Crear curso';
    });
  }

  volver() {
    this.router.navigate(['/administrar/cursos'], {replaceUrl: true});
  }
  guardarCurso() {
    if (this.formulario.valid || this.imagen) {
      let curso: Curso;
      curso = this.formulario.value;
      curso.imagen = this.imagen
      this.cursoService.guardarCurso(curso).subscribe(rta => {
        const estado: string = this.formulario.value.idCurso ? 'modificado' : 'creado';
        this.messagesService.ventanaExitosa('Éxito', `Curso ${this.formulario.value.nombre} ${estado}`);
        this.router.navigate(['/administrar/cursos'], {replaceUrl: true});
      }, error => {
        this.messagesService.ventanaErrorConFooter('Atención', 'No se pudo guardar el curso');
      });
    } else {
      this.messagesService.ventanaError('Atención', 'formulario invalido');
    }
  }

  clickBtn() {
    // Efectúo programáticamente la acción de darle click a un elemento input con type="file"
    // y así se abre una ventana para subir archivos
    this.fileInput.nativeElement.click();
  }

  capturarFoto($event): any {
    this.imagen.nombre = $event.target.files[0].name;
    this.imagenHeader = $event.target.files[0].name;
    const archivoCapturado = $event.target.files[0];
    this.archivoService.extraerBase64(archivoCapturado).then((value: any) => {
      this.imagen.foto = value.base;
    });
  }

  ionViewDidLeave() {
    this.formulario.reset();
    this.store.dispatch(new ResetCurso());
  }
}
