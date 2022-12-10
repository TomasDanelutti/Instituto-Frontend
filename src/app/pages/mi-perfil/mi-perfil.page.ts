import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {Usuario} from "../../model/Usuario";
import {UsuarioLogueadoState} from "../../state/states/usuarioLogueado.state";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessagesService} from "../../services/messages.service";
import {ArchivoService} from "../../services/Archivo.service";
import {Archivo} from "../../model/Archivo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueadoState: Observable<Usuario>;
  @ViewChild('imagenInput')
  imagenInput: ElementRef;
  usuario = new Usuario();
  usuarioForm: FormGroup;
  imagen: Archivo = new Archivo();
  constructor(
      private formBuilder: FormBuilder,
      private mesagesService: MessagesService,
      private archivoService: ArchivoService,
      private router: Router) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      idUsuario: [,Validators.required],
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
      this.usuario = value;
      this.usuarioForm.patchValue(value);
      this.usuarioForm.controls.dni.disable();
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

  volver() {
    this.router.navigate(['/home']);
  }

  guardarPerfil() {

  }

  setearFecha($event: string) {
    var fecha = $event.split('T');
    this.usuarioForm.controls.fechaNacimiento.setValue(fecha[0]);
  }
}
