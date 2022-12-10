import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from "../../../model/Usuario";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Archivo} from "../../../model/Archivo";
import {ColumnaTable} from "../../administracion/cursos/cursos.page";
import {MessagesService} from "../../../services/messages.service";
import {AlumnoService} from "../../../services/alumno.service";
import {ArchivoService} from "../../../services/Archivo.service";
import {Alumno} from "../../../model/Alumno";
import {UsuarioService} from "../../../services/usuario.service";

@Component({
  selector: 'app-registrar-alumno',
  templateUrl: './registrar-alumno.page.html',
  styleUrls: ['./registrar-alumno.page.scss'],
})
export class RegistrarAlumnoPage implements OnInit {
  @ViewChild('fileInput')
  fileInput: ElementRef;
  alumnoForm: FormGroup;
  cardHeader: string;
  imagen: Archivo = new Archivo();
  imagenHeader: string;
  cols: ColumnaTable[];
  usuario: Usuario = new Usuario();
  disableInputs: boolean;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private messagesService: MessagesService,
      private alumnoService: AlumnoService,
      private archivoService: ArchivoService,
      private usuarioService: UsuarioService
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
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      confirmarEmail: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      clave: [, Validators.required],
      confirmarClave: [, Validators.required],
    });
    this.imagenHeader = "Ningun archivo seleccionado"
  }

  ionViewWillEnter() {
    this.alumnoForm.disable();
    this.alumnoForm.controls.dni.enable();
    this.disableInputs = true;
  }

  volver() {
    this.router.navigate(['/login'], {replaceUrl: true});
  }

  findUsuarioByDni() {
    if (this.alumnoForm.controls.dni.valid) {
      this.usuarioService.getUsuarioByDni(this.alumnoForm.controls.dni.value).subscribe(value => {
          this.alumnoForm.enable();
          this.disableInputs = false;
      },error => {
        this.messagesService.ventanaError("Atencion", error.error);
        this.alumnoForm.reset();
      })
    }
    else {
      this.alumnoForm.reset();
      this.alumnoForm.disable();
      this.disableInputs = true;
    }
  }

  guardarAlumno() {
    if (this.alumnoForm.valid) {
      let alumno: Alumno;
      alumno = this.alumnoForm.value;
      alumno.imagen = this.imagen;
      this.alumnoService.guardarAlumno(alumno).subscribe(rta => {
        const estado: string = this.alumnoForm.value.idUsuario ? 'modificado' : 'creado';
        this.messagesService.ventanaExitosa('Éxito', `Alumno ${this.alumnoForm.value.nombre} ${estado}`);
        this.router.navigate(['login'], {replaceUrl: true});
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

  validateEmail() {
    if (this.alumnoForm.controls.email.value !== this.alumnoForm.controls.confirmarEmail.value) {
      this.alumnoForm.controls.confirmacionEmail.setErrors({incorrect: true});
    } else {
      this.alumnoForm.controls.confirmacionEmail.setErrors(null);
    }
  }

  validateClaves() {
    if (this.alumnoForm.controls.clave.value !== this.alumnoForm.controls.confirmarClave.value) {
      this.messagesService.ventanaError('Error', 'Las claves no coinciden');
      return false;
    } else {
      return true;
    }
  }

  ionViewDidLeave() {
    this.alumnoForm.reset();
  }

}
