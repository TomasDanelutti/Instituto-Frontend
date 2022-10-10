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
  cardHeader: string;
  imagen: Archivo = new Archivo();
  imagenHeader: string;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private messagesService: MessagesService,
      private alumnoService: AlumnoService,
      private store: Store,
      private archivoService: ArchivoService,
  ) {
  }

  ngOnInit() {
    this.alumnoForm = this.formBuilder.group({
      idUsuario: [,Validators.required],
      dni: [,Validators.required],
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      telefono: [, Validators.required],
      email: [, Validators.required],
      confirmacionEmail: [, Validators.required,],
      fechaNacimiento: [, Validators.required],
      genero: [, Validators.required],
      domicilio: [, Validators.required],
      numLegajo: [, Validators.required],
    });

    this.usuarioState.subscribe((usuario: Usuario) => {
      if (usuario) {
        console.log(usuario)
        this.alumnoForm.patchValue(usuario);
        this.imagen = usuario.imagen;
        this.imagenHeader = usuario?.imagen?.nombre;
        this.alumnoForm.controls.confirmacionEmail.setValue(usuario.email);
      }
      else {
        this.alumnoForm.reset();
        this.imagenHeader = "Ningun archivo seleccionado"
      }
      this.cardHeader = this.alumnoForm.value.idUsuario ? 'Modificar alumno' : 'Crear alumno';
    });
  }


  validateEmail() {
    if (this.alumnoForm.get('email').value !== this.alumnoForm.get('confirmacionEmail').value) {
      this.alumnoForm.controls.confirmacionEmail.setErrors({incorrect: true});
    } else {
      this.alumnoForm.controls.confirmacionEmail.setErrors(null);
    }
  }

  volver() {
    this.router.navigate(['administrar/alumnos'], {replaceUrl: true});
  }

  guardarAlumno() {
    if (this.alumnoForm.valid && this.imagen) {
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
