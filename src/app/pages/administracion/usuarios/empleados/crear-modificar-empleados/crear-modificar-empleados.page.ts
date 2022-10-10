import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../../../../model/Usuario';
import {MessagesService} from '../../../../../services/messages.service';
import {Select, Store} from "@ngxs/store";
import {ResetUsuario, UsuarioState} from "../../../../../state/states/usuario.state";
import {Observable} from "rxjs";
import {EmpleadoService} from "../../../../../services/empleado.service";
import {ArchivoService} from "../../../../../services/Archivo.service";
import {Archivo} from "../../../../../model/Archivo";
import {Empleado} from "../../../../../model/Empleado";

@Component({
  selector: 'app-crear-modificar-empleados',
  templateUrl: './crear-modificar-empleados.page.html',
  styleUrls: ['./crear-modificar-empleados.page.scss'],
})
export class CrearModificarEmpleadosPage implements OnInit {
  @Select(UsuarioState.getUsuario) usuarioState: Observable<Usuario>
  @ViewChild('fileInput')
  fileInput: ElementRef;
  empleadoForm: FormGroup;
  cardHeader: string;
  imagen: Archivo = new Archivo();
  imagenHeader: string;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private messagesService: MessagesService,
      private empleadoService: EmpleadoService,
      private archivoService: ArchivoService,
      private store: Store) { }

  ngOnInit() {
    this.empleadoForm = this.formBuilder.group({
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
      sueldo: [, Validators.required],
    });

    this.usuarioState.subscribe((usuario: Usuario) => {
      if (usuario) {
        this.empleadoForm.patchValue(usuario);
        this.imagen = usuario.imagen;
        this.imagenHeader = usuario?.imagen?.nombre;
        this.empleadoForm.controls.confirmacionEmail.setValue(usuario.email);
      }
      else {
        this.empleadoForm.reset();
        this.imagenHeader = "Ningun archivo seleccionado"
      }
      this.cardHeader = this.empleadoForm.value.idUsuario ? 'Modificar alumno' : 'Crear alumno';
    });
  }

  validateEmail() {
    if (this.empleadoForm.get('email').value !== this.empleadoForm.get('confirmacionEmail').value) {
      this.empleadoForm.controls.confirmacionEmail.setErrors({incorrect: true});
    } else {
      this.empleadoForm.controls.confirmacionEmail.setErrors(null);
    }
  }

  setearFecha($event: string) {
    var fecha = $event.split('T');
    this.empleadoForm.controls.fechaNacimiento.setValue(fecha[0]);
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


  volver() {
    this.router.navigate(['administrar/administrativos'], {replaceUrl: true});
  }

  guardarAdministrativo() {
    if (this.empleadoForm.valid && this.imagen) {
      let empleado: Empleado;
      empleado = this.empleadoForm.value;
      empleado.imagen = this.imagen;
      this.empleadoService.guardarEmpleado(empleado).subscribe(rta => {
        const estado: string = this.empleadoForm.value.idUsuario ? 'modificado' : 'creado';
        this.messagesService.ventanaExitosa('Éxito', `Administrativo ${this.empleadoForm.value.nombre} ${estado}`);
        this.router.navigate(['administrar/administrativos'], {replaceUrl: true});
      }, error => {
        this.messagesService.ventanaError('Atención', 'No se pudo guardar el Administrativo');
      });
    } else {
      this.messagesService.ventanaError('Atención', 'formulario invalido');
    }
  }

  ionViewDidLeave() {
    this.empleadoForm.reset();
    this.store.dispatch(new ResetUsuario());
  }

}
