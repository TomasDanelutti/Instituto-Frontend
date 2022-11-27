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
  disableInputs: boolean;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private messagesService: MessagesService,
      private empleadoService: EmpleadoService,
      private archivoService: ArchivoService,
      private store: Store) { }

  ngOnInit() {
    this.empleadoForm = this.formBuilder.group({
      idUsuario: [],
      dni: ["",Validators.required],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
      genero: ["", Validators.required],
      telefono: ["", Validators.required],
      estadoCivil: ["", Validators.required],
      nivelEducativo: ["", Validators.required],
      domicilio: ["", Validators.required],
      email: ["", Validators.required],
      confirmacionEmail: ["", Validators.required],
      sueldo: ["", Validators.required],
      puesto: ["", Validators.required]
    });

    this.usuarioState.subscribe((usuario: Usuario) => {
      if (usuario) {
        this.empleadoForm.patchValue(usuario);
        this.imagen = usuario.imagen;
        this.imagenHeader = usuario?.imagen?.nombre;
        this.empleadoForm.controls.confirmacionEmail.setValue(usuario.email);
        this.empleadoForm.controls.puesto.disable();
        this.disableInputs = true;
      }
      else {
        this.empleadoForm.reset();
        this.imagenHeader = "Ningun archivo seleccionado"
      }
      console.log(this.empleadoForm.value)
      this.cardHeader = this.empleadoForm.value.idUsuario ? 'Modificar empleado' : 'Crear empleado';
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
    this.router.navigate(['administrar/empleados'], {replaceUrl: true});
  }

  guardarAdministrativo() {
      let empleado: Empleado;
      this.empleadoForm.controls.puesto.enable();
      empleado = this.empleadoForm.value;
      empleado.imagen = this.imagen;
      console.log(empleado)
      this.empleadoService.guardarEmpleado(empleado).subscribe(rta => {
        const estado: string = this.empleadoForm.value.idUsuario ? 'modificado' : 'creado';
        this.messagesService.ventanaExitosa('Éxito', `Administrativo ${this.empleadoForm.value.nombre} ${estado}`);
        this.router.navigate(['administrar/empleados'], {replaceUrl: true});
      }, error => {
        this.messagesService.ventanaError('Atención', 'No se pudo guardar el Administrativo');
      });
  }

  ionViewWillLeave() {
    this.empleadoForm.reset();
    this.store.dispatch(new ResetUsuario());
  }

}
