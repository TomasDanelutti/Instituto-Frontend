import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ResetUsuario, UsuarioState} from "../../../state/states/usuario.state";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Archivo} from "../../../model/Archivo";
import {Router} from "@angular/router";
import {MessagesService} from "../../../services/messages.service";
import {EmpleadoService} from "../../../services/empleado.service";
import {ArchivoService} from "../../../services/Archivo.service";
import {Empleado} from "../../../model/Empleado";
import {Persona} from "../../../model/Persona";

@Component({
  selector: 'app-dialog-empleados',
  templateUrl: './dialog-empleados.component.html',
  styleUrls: ['./dialog-empleados.component.scss'],
})
export class DialogEmpleadosComponent implements OnInit {
  @Select(UsuarioState.getUsuario) usuarioState: Observable<Persona>
  @Output() showDialogGuardarEmpleado = new EventEmitter<boolean>();
  @Output() showDialogCancelarEmpleado = new EventEmitter<boolean>();
  @ViewChild('fileInput')
  display: boolean = false;
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
    this.display = true;
    this.empleadoForm = this.formBuilder.group({
      idPersona: [],
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
      confirmacionEmail: [, Validators.required],
      sueldo: [, Validators.required],
      puesto: [, Validators.required]
    });

    this.usuarioState.subscribe((empleado: Persona) => {
      empleado = empleado as Empleado;
      if (empleado) {
        this.empleadoForm.patchValue(empleado);
        this.imagen = empleado.imagen;
        this.imagenHeader = empleado?.imagen?.nombre;
        this.empleadoForm.controls.confirmacionEmail.setValue(empleado.email);
        this.empleadoForm.controls.puesto.disable();
      }
      else {
        this.empleadoForm.reset();
        this.imagenHeader = "Ningun archivo seleccionado"
      }
      this.cardHeader = this.empleadoForm.value.idPersona ? 'Modificar empleado' : 'Crear empleado';
    });
  }

  hideDialogEmpleados() {
    this.showDialogCancelarEmpleado.emit(false);
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

  guardarAdministrativo() {
    let empleado: Empleado;
    this.empleadoForm.controls.puesto.enable();
    empleado = this.empleadoForm.value;
    empleado.imagen = this.imagen;
    this.empleadoService.guardarEmpleado(empleado).subscribe(rta => {
      const estado: string = this.empleadoForm.value.idUsuario ? 'modificado' : 'creado';
      this.messagesService.ventanaExitosa('Éxito', `Administrativo ${this.empleadoForm.value.nombre} ${estado}`);
      this.showDialogGuardarEmpleado.emit(false);

    }, error => {
      this.messagesService.ventanaError('Atención', 'No se pudo guardar el Administrativo');
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ResetUsuario);
    this.empleadoForm.reset();
  }
}
