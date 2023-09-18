import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ResetUsuario, UsuarioState} from "../../../state/states/usuario.state";
import {Persona} from "../../../model/Persona";
import {Observable, Subscription} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Archivo} from "../../../model/Archivo";
import {ColumnaTable} from "../../../pages/administracion/cursos/cursos.page";
import {Alumno} from "../../../model/Alumno";
import {MessagesService} from "../../../services/messages.service";
import {AlumnoService} from "../../../services/alumno.service";
import {ArchivoService} from "../../../services/Archivo.service";
import {CursosService} from "../../../services/cursos.service";
import {InscripcionService} from "../../../services/inscripcion.service";
import {Curso} from "../../../model/Curso";
import {SweetAlertResult} from "sweetalert2";
import {InscripcionDTO} from "../../../model/DTOS/InscripcionDTO";
import {SetCantDesinscripcionesAction} from "../../../state/states/desinscripcion.state";
import {AlumnoExt} from "../../../model/EXTS/AlumnoExt";

@Component({
  selector: 'app-dialog-alumnos',
  templateUrl: './dialog-alumnos.component.html',
  styleUrls: ['./dialog-alumnos.component.scss'],
})
export class DialogAlumnosComponent implements OnInit, OnDestroy {
  @Select(UsuarioState.getUsuario) usuarioState: Observable<Persona>
  @Output() showDialogGuardarAlumno = new EventEmitter<boolean>();
  @Output() showDialogCancelarAlumno = new EventEmitter<boolean>();
  subscriptions: Subscription[] = [];
  @ViewChild('fileInput')
  fileInput: ElementRef;
  cardHeader: string;
  display: boolean = false;
  alumnoForm: FormGroup;
  imagen: Archivo = new Archivo();
  imagenHeader: string;
  cursosTable: any[] = [];
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  alumno: Alumno = new Alumno();

  constructor(
      private formBuilder: FormBuilder,
      private messagesService: MessagesService,
      private alumnoService: AlumnoService,
      private store: Store,
      private archivoService: ArchivoService,
      private cursosServce: CursosService,
      private inscripcionService: InscripcionService
  ) {
  }

  ngOnInit() {
    this.display = true;
    this.alumnoForm = this.formBuilder.group({
      idPersona: [],
      dni: [ ,Validators.required],
      nombre: [ ,Validators.required],
      apellido: [ ,Validators.required],
      fechaNacimiento: [ ,Validators.required],
      genero: [ ,Validators.required],
      telefono: [ ,Validators.required],
      estadoCivil: [ ,Validators.required],
      nivelEducativo: [ ,Validators.required],
      domicilio: [ ,Validators.required],
      email: [ ,Validators.required],
    });

    this.usuarioState.subscribe((alumno: Alumno) => {
      if (alumno) {
        this.alumno = alumno;
        this.alumnoForm.patchValue(alumno);
        this.imagen = alumno.imagen;
        this.imagenHeader = alumno?.imagen?.nombre;
        this.armarTabla();
        this.alumnoForm.controls.dni.disable();
      }
      this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'profesor', header: 'Profesor'},{field: 'turno', header: 'Turno'}];
      this.cardHeader = this.alumnoForm.value.idPersona ? 'Modificar alumno' : 'Crear alumno';
    });
  }

  armarTabla() {
    this.subscriptions.push(this.cursosServce.getCursoInscriptosByUsuario(this.alumno.idPersona)
        .subscribe(cursos => {
          cursos.forEach((item: Curso) => {
            const auxObjeto = {
              id: item.idCurso,
              imagen: item.imagen.foto,
              nombre: item.nombre,
              turno: item.turno,
              profesor: item.profesor.nombre,
              inscripto: true
            };
            this.cursosTable.push(auxObjeto);
          });
        }));
  }

  desinscribirse(idCurso: number) {
    this.messagesService.ventanaConfirmar("Atencion", "Estas seguro que deseas desinscribir al curso al alumno?").then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const inscripcionDto = new InscripcionDTO();
        inscripcionDto.idCurso = idCurso;
        inscripcionDto.idPersona = this.alumnoForm.controls.idPersona.value;
        this.subscriptions.push(this.inscripcionService.desinscribirse(inscripcionDto).subscribe(respuesta => {
          this.store.dispatch(new SetCantDesinscripcionesAction());
          this.messagesService.showToast({key: 'mensaje', severity: 'success', summary: 'Exitó', detail: respuesta.mensaje});
        }, error =>  this.messagesService.showToast({key: 'mensaje', severity: 'error', summary: 'Error', detail: error.error})));
      }
    });
  }

  hideDialogAlumnos() {
    this.showDialogCancelarAlumno.emit(false);
  }

  guardarAlumno() {
    this.alumnoForm.controls.dni.enable();
    if (this.alumnoForm.valid) {
      let alumno: Alumno = new Alumno();
      alumno = this.alumnoForm.value;
      alumno.imagen = this.imagen;
      console.log(alumno)
      this.subscriptions.push(this.alumnoService.guardarAlumno(alumno).subscribe(rta => {
        this.messagesService.showToast({key: 'mensaje', severity: 'success', summary: 'Exitó', detail: `El alumno ${this.alumnoForm.value.nombre} ha sido modificado correctamente`});
        this.showDialogGuardarAlumno.emit(false);
      }, error => {
        this.messagesService.showToast({key: 'mensaje', severity: 'error', summary: 'Error', detail: error.error});
      }));
    }
    else {
      this.messagesService.showToast({key: 'mensaje', severity: 'warn', summary: 'Atención', detail: `Formulario invalido`});
    }

  }

  setearFecha($event: string) {
    var fecha = $event.split('T');
    this.alumnoForm.controls.fechaNacimiento.setValue(fecha[0]);
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

  ngOnDestroy(): void {
    this.alumnoForm.reset();
    this.store.dispatch(ResetUsuario);
    this.subscriptions.forEach(value => value.unsubscribe());
  }

}
