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
  cursoForm: FormGroup;
  cardHeader: string;
  imagen: Archivo = new Archivo();
  programa: Archivo = new Archivo();
  imagenHeader: string;
  programaHeader: string;
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private cursoService: CursosService,
      private messagesService: MessagesService,
      private archivoService: ArchivoService,
      private store: Store) { }

  ngOnInit() {
    this.cursoForm = this.formBuilder.group({
      idCurso: [],
      nombre: [Validators.required],
      turno: [Validators.required],
      profesor: [Validators.required],
      cupoMinimo: [Validators.required],
      cupoMaximo: [Validators.required],
      fechaInicio: [Validators.required],
      fechaFinalizacion: [Validators.required],
      horario: [Validators.required],
      modalidad: [Validators.required],
      aula: []
    });
    this.cursoState.subscribe(curso => {
      if (curso) {
        this.cursoForm.patchValue(curso);
        this.programa = curso.programa
        this.programaHeader = curso?.programa?.nombre
        this.imagen = curso.imagen;
        this.imagenHeader = curso?.imagen?.nombre;
        // this.cursoForm.controls.modalidad.value = "Virtual" ? this.cursoForm.controls.aula.enable() : this.cursoForm.controls.aula.disable();
      }
      else {
        this.imagenHeader = "Ningun archivo seleccionado";
        this.programaHeader = "Ningun archivo seleccionado";
        this.cursoForm.reset();
      }
      this.cardHeader = this.cursoForm.value.idCurso ? 'Modificar curso' : 'Crear curso';
      this.cursoForm.controls.aula.disable();
    });
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

  capturarPrograma($event): any {
    this.programa.nombre = $event.target.files[0].name;
    this.programaHeader = $event.target.files[0].name;
    const archivoCapturado = $event.target.files[0];
    this.archivoService.extraerBase64(archivoCapturado).then((value: any) => {
      this.programa.foto = value.base;
    });
  }

  cambiarModalidad($event: Event) {
    if ($event.toString() == "Presencial" || $event.toString() == "SemiPresencial") {
      this.cursoForm.controls.aula.enable();
      this.cursoForm.controls.aula.addValidators(Validators.required);
    }
    else {
      this.cursoForm.controls.aula.disable();
    }
  }

  setearFechaInicio($event: string) {
    var fecha = $event.split('T');
    this.cursoForm.controls.fechaInicio.setValue(fecha[0]);
  }

  setearFechaFinalizacion($event: string) {
    var fecha = $event.split('T');
    this.cursoForm.controls.fechaFinalizacion.setValue(fecha[0]);
  }

  volver() {
    this.router.navigate(['/administrar/cursos'], {replaceUrl: true});
  }

  guardarCurso() {
    if (this.cursoForm.valid && this.programa.foto) {
      let curso: Curso;
      curso = this.cursoForm.value;
      curso.imagen = this.imagen;
      curso.programa = this.programa;
      this.cursoService.guardarCurso(curso).subscribe(rta => {
        const estado: string = this.cursoForm.value.idCurso ? 'modificado' : 'creado';
        this.messagesService.ventanaExitosa('Éxito', `Curso ${this.cursoForm.value.nombre} ${estado}`);
        this.router.navigate(['/administrar/cursos'], {replaceUrl: true});
      }, error => {
        this.messagesService.ventanaErrorConFooter('Atención', 'No se pudo guardar el curso');
      });
    } else {
      this.messagesService.ventanaError('Atención', 'Formulario invalido');
    }
  }

  ionViewDidLeave() {
    this.cursoForm.reset();
    this.store.dispatch(new ResetCurso());
  }
}
