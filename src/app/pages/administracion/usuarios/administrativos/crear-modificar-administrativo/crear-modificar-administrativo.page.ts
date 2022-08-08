import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Usuario} from '../../../../../model/Usuario';
import {MessagesService} from '../../../../../services/messages.service';
import {UsuarioService} from '../../../../../services/usuario.service';
import {Select} from "@ngxs/store";
import {UsuarioState} from "../../../../../state/states/usuario.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-crear-modificar-administrativo',
  templateUrl: './crear-modificar-administrativo.page.html',
  styleUrls: ['./crear-modificar-administrativo.page.scss'],
})
export class CrearModificarAdministrativoPage implements OnInit {
  @Select(UsuarioState.getUsuario) usuarioState: Observable<Usuario>
  formulario: FormGroup;
  cardHeader: string;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private messagesService: MessagesService,
      private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      idUsuario: [],
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
    this.usuarioState.subscribe(usuario => {
      if (usuario) {
        this.formulario.patchValue(usuario);
      }
      else {
        this.formulario.reset();
      }
      this.cardHeader = this.formulario.value.idUsuario ? 'Modificar administrativo' : 'Crear administrativo';
    });
  }

  volver() {
    this.router.navigate(['administrar/administrativos'], {replaceUrl: true});
  }

  guardarAdministrativo() {
    if (this.formulario.valid) {
      this.usuarioService.guardarAdministrativo(this.formulario.value).subscribe(rta => {
        const estado: string = this.formulario.value.idUsuario ? 'modificado' : 'creado';
        this.messagesService.showMessage('Éxito', `Administrativo ${this.formulario.value.nombre} ${estado}`, 5000);
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
