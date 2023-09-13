import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UsuarioLogueadoState} from "../../../state/states/usuarioLogueado.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {Persona} from "../../../model/Persona";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Archivo} from "../../../model/Archivo";
import {MessagesService} from "../../../services/messages.service";
import {ArchivoService} from "../../../services/Archivo.service";

@Component({
  selector: 'app-dialog-datos-personales',
  templateUrl: './dialog-datos-personales.component.html',
  styleUrls: ['./dialog-datos-personales.component.scss'],
})
export class DialogDatosPersonalesComponent implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueadoState: Observable<Persona>;
  @Output() showCerrarDialogDatosPersonales = new EventEmitter<boolean>();
  @ViewChild('imagenInput')
  imagenInput: ElementRef;
  persona = new Persona();
  personaForm: FormGroup;
  imagen: Archivo = new Archivo();
  display: boolean = false;
  constructor(
      private formBuilder: FormBuilder,
      private mesagesService: MessagesService,
      private archivoService: ArchivoService) { }

  ngOnInit() {
    this.display = true;
    this.personaForm = this.formBuilder.group({
      idPersona: [,Validators.required],
      dni: [,Validators.required],
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      telefono: [, Validators.required],
      email: [, Validators.required],
      fechaNacimiento: [, Validators.required],
      genero: [, Validators.required],
      domicilio: [, Validators.required],
    });
    this.usuarioLogueadoState.subscribe(value => {
      this.persona = value;
      this.personaForm.patchValue(value);
      this.personaForm.controls.dni.disable();
    });
  }

  clickBtn() {
    // Efectúo programáticamente la acción de darle click a un elemento input con type="file"
    // y así se abre una ventana para subir archivos
    this.imagenInput.nativeElement.click();
  }

  capturarFoto($event): any {
    this.imagen.nombre = $event.target.files[0].name;
    const archivoCapturado = $event.target.files[0];
    this.archivoService.extraerBase64(archivoCapturado).then((value: any) => {
      this.imagen.foto = value.base;
    });
  }

  hideDialogDatosPersonales() {
    this.showCerrarDialogDatosPersonales.emit(false);
  }

  guardarPerfil() {
    this.showCerrarDialogDatosPersonales.emit(false);
  }

  setearFecha($event: string) {
    var fecha = $event.split('T');
    this.personaForm.controls.fechaNacimiento.setValue(fecha[0]);
  }

}
