import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {CursoState, ResetCurso} from "../../../state/states/curso.state";
import {Observable, Subscription} from "rxjs";
import {Curso} from "../../../model/Curso";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Archivo} from "../../../model/Archivo";
import {CursosService} from "../../../services/cursos.service";
import {MessagesService} from "../../../services/messages.service";
import {ArchivoService} from "../../../services/Archivo.service";

@Component({
  selector: 'app-dialog-cursos',
  templateUrl: './dialog-cursos.component.html',
  styleUrls: ['./dialog-cursos.component.scss'],
})
export class DialogCursosComponent implements OnInit {
  @Select(CursoState.getCurso) cursoState: Observable<Curso>;
  @Output() showDialogGuardarCurso = new EventEmitter<boolean>();
  @Output() showDialogCancelarCurso = new EventEmitter<boolean>();
  subscriptions: Subscription[] = [];
  @ViewChild('imagenInput')
  imagenInput: ElementRef;
  @ViewChild('archivoInput')
  archivoInput: ElementRef;
  cursoForm: FormGroup;
  cardHeader: string;
  display: boolean = false;
  imagen: Archivo = new Archivo();
  programa: Archivo = new Archivo();
  imagenHeader: string;
  programaHeader: string;
  constructor(
      private formBuilder: FormBuilder,
      private cursoService: CursosService,
      private messagesService: MessagesService,
      private archivoService: ArchivoService,
      private store: Store) { }

  ngOnInit() {
    this.display = true;
    this.cursoForm = this.formBuilder.group({
      idCurso: [],
      nombre: ["", Validators.required],
      turno: ["", Validators.required],
      profesor: ["", Validators.required],
      cupoMinimo: ["", Validators.required],
      cupoMaximo: ["", Validators.required],
      fechaInicio: ["", Validators.required],
      fechaFinalizacion: ["", Validators.required],
      horario: ["", Validators.required],
      modalidad: ["", Validators.required],
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
    this.imagenInput.nativeElement.click();
  }

  clickBtn1() {
    // Efectúo programáticamente la acción de darle click a un elemento input con type="file"
    // y así se abre una ventana para subir archivos
    this.archivoInput.nativeElement.click();
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

  hideDialogCurso() {
    this.showDialogCancelarCurso.emit(false);
  }

  guardarCurso() {
    if (this.programa.foto) {
      let curso: Curso = new Curso();
      curso = this.cursoForm.value;
      curso.imagen = this.imagen;
      curso.programa = this.programa;
      this.subscriptions.push(this.cursoService.guardarCurso(curso).subscribe(rta => {
        const estado: string = this.cursoForm.value.idCurso ? 'modificado' : 'creado';
        this.messagesService.showToast({key: 'mensaje', severity: 'success', summary: 'Exitó', detail: `El curso ${this.cursoForm.value.nombre} ha sido ${estado} correctamente`});
        this.showDialogGuardarCurso.emit(false);
      }, error => {
        this.messagesService.showToast({key: 'mensaje', severity: 'error', summary: 'Error', detail: `No se pudo guardar el curso`});
      }));
    } else {
      this.messagesService.showToast({key: 'mensaje', severity: 'warn', summary: 'Atención', detail: `Formulario invalido`});
    }
  }

  ngOnDestroy(): void {
    this.cursoForm.reset();
    this.store.dispatch(ResetCurso);
  }
}
