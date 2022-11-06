import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessagesService} from '../../../../../services/messages.service';
import {Usuario} from '../../../../../model/Usuario';
import {Select, Store} from "@ngxs/store";
import {ResetUsuario, UsuarioState} from "../../../../../state/states/usuario.state";
import {Observable} from "rxjs";
import {AlumnoService} from "../../../../../services/alumno.service";
import {ArchivoService} from "../../../../../services/Archivo.service";
import {Alumno} from "../../../../../model/Alumno";
import {Archivo} from "../../../../../model/Archivo";
import {CursosService} from "../../../../../services/cursos.service";
import {Curso} from "../../../../../model/Curso";
import {ColumnaTable} from "../../../cursos/cursos.page";

@Component({
  selector: 'app-crear-modificar-alumno',
  templateUrl: './crear-modificar-alumno.page.html',
  styleUrls: ['./crear-modificar-alumno.page.scss'],
})
export class CrearModificarAlumnoPage implements OnInit {
  @Select(UsuarioState.getUsuario) usuarioState: Observable<Usuario>
  @ViewChild('fileInput')
  fileInput: ElementRef;
  alumnoForm: FormGroup;
  imagen: Archivo = new Archivo();
  disableInputs: boolean;
  imagenHeader: string;
  cursosTable: any[] = [];
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  usuario: Usuario = new Usuario();

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private messagesService: MessagesService,
      private alumnoService: AlumnoService,
      private store: Store,
      private archivoService: ArchivoService,
      private cursosServce: CursosService
  ) {
  }

  ngOnInit() {
    this.alumnoForm = this.formBuilder.group({
      idUsuario: [],
      dni: [,Validators.required],
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      fechaNacimiento: [, Validators.required],
      genero: [, Validators.required],
      telefono: [, Validators.required],
      estadoCivil: [, Validators.required],
      nivelEducativo: [, Validators.required],
      domicilio: [, Validators.required],
      email: [, Validators.required],
    });

    this.usuarioState.subscribe((usuario: Usuario) => {
      if (usuario) {
        this.usuario = usuario;
        this.alumnoForm.patchValue(usuario);
        this.imagen = usuario.imagen;
        this.imagenHeader = usuario?.imagen?.nombre;
        this.disableInputs = true;
        this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'profesor', header: 'Profesor'},{field: 'turno', header: 'Turno'}];
        this.armarTabla();
      }
    });
  }

  armarTabla() {
    this.cursosServce.getCursoInscriptosByUsuario(this.usuario.idUsuario)
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
        });
  }

  desinscribirse(idCurso: number) {
  }

  volver() {
    this.router.navigate(['administrar/alumnos'], {replaceUrl: true});
  }

  guardarAlumno() {
    if (this.alumnoForm.valid) {
      let alumno: Alumno;
      alumno = this.alumnoForm.value;
      alumno.imagen = this.imagen;
      this.alumnoService.guardarAlumno(alumno).subscribe(rta => {
        const estado: string = this.alumnoForm.value.idUsuario ? 'modificado' : 'creado';
        this.messagesService.ventanaExitosa('Éxito', `Alumno ${this.alumnoForm.value.nombre} ${estado}`);
        this.router.navigate(['administrar/alumnos'], {replaceUrl: true});
      }, error => {
        this.messagesService.ventanaError('Atención', 'No se pudo guardar el Alumno');
      });
    } else {
      this.messagesService.ventanaError('Atención', 'formulario invalido');
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

  ionViewDidLeave() {
    this.alumnoForm.reset();
    this.store.dispatch(new ResetUsuario());
  }
}
