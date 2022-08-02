import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Usuario} from '../../../../../model/Usuario';
import {MessagesService} from '../../../../../services/messages.service';
import {UsuarioService} from '../../../../../services/usuario.service';

@Component({
  selector: 'app-crear-modificar-administrativo',
  templateUrl: './crear-modificar-administrativo.page.html',
  styleUrls: ['./crear-modificar-administrativo.page.scss'],
})
export class CrearModificarAdministrativoPage implements OnInit {
  formulario: FormGroup;
  administrativo: Usuario;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private messagesService: MessagesService,
      private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      dni: [],
      fechaNacimiento: [],
      nombre: [],
      apellido: [],
      domicilio: [],
      telefono: [],
      genero: [],
      clave: [],
      repetirClave: [],
      email: [],
      repetirEmail: [],
    });
  }

  async ionViewWillEnter() {
    // this.administrativo = (await this.storage.get('administrativo')) || new Usuario() && this.formulario.reset();
    if (this.administrativo) {
      this.formulario.patchValue(this.administrativo);
    }
  }

  volver() {
    this.router.navigate(['administrar/administrativos'], {replaceUrl: true});
  }

  guardarAdministrativo() {
    this.administrativo = this.formulario.value;
    if (this.formulario.valid) {
      this.usuarioService.guardarAdministrativo(this.administrativo).subscribe(rta => {
        this.messagesService.showMessage('Exito', 'Administrativo guardado correctamente', 5000);
        this.router.navigate(['administrar/administrativos'], {replaceUrl: true});
      }, error => {
        this.messagesService.showMessage('Atención', 'No se pudo guardar el Administrativo', 5000);
      });
    } else {
      this.messagesService.showMessage('Atención', 'formulario invalido', 5000);
    }
  }

  ionViewDidLeave() {
    this.formulario.reset();
    // this.storage.remove('administrativo');
  }

  setearFecha($event: string) {
    var fecha = $event.split('T');
    this.formulario.controls.fechaNacimiento.setValue(fecha[0]);
  }

}
