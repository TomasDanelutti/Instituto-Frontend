import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../../../../model/Usuario';
import {MessagesService} from '../../../../../services/messages.service';
import {Select, Store} from "@ngxs/store";
import {ResetUsuario, UsuarioState} from "../../../../../state/states/usuario.state";
import {Observable} from "rxjs";
import {EmpleadoService} from "../../../../../services/Empleado.service";
import {ArchivoService} from "../../../../../services/Archivo.service";
import {Archivo} from "../../../../../model/Archivo";

@Component({
  selector: 'app-crear-modificar-administrativo',
  templateUrl: './crear-modificar-administrativo.page.html',
  styleUrls: ['./crear-modificar-administrativo.page.scss'],
})
export class CrearModificarAdministrativoPage implements OnInit {
  @Select(UsuarioState.getUsuario) usuarioState: Observable<Usuario>
  @ViewChild('fileInput')
  fileInput: ElementRef;
  EmpleadoForm: FormGroup;
  cardHeader: string;
  imagen: Archivo = new Archivo();
  imagenHeader: string;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private messagesService: MessagesService,
      private administrativoService: EmpleadoService,
      private imagenService: ArchivoService,
      private store: Store) { }

  ngOnInit() {
    this.EmpleadoForm = this.formBuilder.group({
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
        this.EmpleadoForm.patchValue(usuario);
        this.imagen = usuario.imagen;
        this.imagenHeader = usuario?.imagen?.nombre;
        this.EmpleadoForm.controls.confirmacionEmail.setValue(usuario.email);
      }
      else {
        this.EmpleadoForm.reset();
        this.imagenHeader = "Ningun archivo seleccionado"
      }
      this.cardHeader = this.EmpleadoForm.value.idUsuario ? 'Modificar alumno' : 'Crear alumno';
    });
  }

  validateEmail() {
    if (this.EmpleadoForm.get('email').value !== this.EmpleadoForm.get('confirmacionEmail').value) {
      this.EmpleadoForm.controls.confirmacionEmail.setErrors({incorrect: true});
    } else {
      this.EmpleadoForm.controls.confirmacionEmail.setErrors(null);
    }
  }

  setearFecha($event: string) {
    var fecha = $event.split('T');
    this.EmpleadoForm.controls.fechaNacimiento.setValue(fecha[0]);
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
    this.imagenService.extraerBase64(archivoCapturado).then((value: any) => {
      this.imagen.foto = value.base;
    });
  }


  volver() {
    this.router.navigate(['administrar/administrativos'], {replaceUrl: true});
  }

  guardarAdministrativo() {
    if (this.EmpleadoForm.valid && this.imagen) {
      let administrativo: Administrativo;
      administrativo = this.EmpleadoForm.value;
      administrativo.imagen = this.imagen;
      this.administrativoService.guardarAdministrativo(administrativo).subscribe(rta => {
        const estado: string = this.EmpleadoForm.value.idUsuario ? 'modificado' : 'creado';
        this.messagesService.ventanaExitosa('Éxito', `Administrativo ${this.EmpleadoForm.value.nombre} ${estado}`);
        this.router.navigate(['administrar/administrativos'], {replaceUrl: true});
      }, error => {
        this.messagesService.ventanaError('Atención', 'No se pudo guardar el Administrativo');
      });
    } else {
      this.messagesService.ventanaError('Atención', 'formulario invalido');
    }
  }

  ionViewDidLeave() {
    this.EmpleadoForm.reset();
    this.store.dispatch(new ResetUsuario());
  }

}
