import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessagesService} from '../../../../../services/messages.service';
import {UsuarioService} from '../../../../../services/usuario.service';
import {Programa} from '../../../../../model/Programa';
import {Usuario} from '../../../../../model/Usuario';
import {Select, Store} from "@ngxs/store";
import {ResetUsuario, UsuarioState} from "../../../../../state/states/usuario.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-crear-modificar-alumno',
  templateUrl: './crear-modificar-alumno.page.html',
  styleUrls: ['./crear-modificar-alumno.page.scss'],
})
export class CrearModificarAlumnoPage implements OnInit {
  @Select(UsuarioState.getUsuario) usuarioState: Observable<Usuario>
  formulario: FormGroup;
  cardHeader: string;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private messagesService: MessagesService,
      private usuarioService: UsuarioService,
      private store: Store) { }

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
      this.cardHeader = this.formulario.value.idUsuario ? 'Modificar alumno' : 'Crear alumno';
    });
  }

  volver() {
    this.router.navigate(['administrar/alumnos'], {replaceUrl: true});
  }

  guardarAlumno() {
    if (this.formulario.valid) {
      this.usuarioService.guardarAlumno(this.formulario.value).subscribe(rta => {
        const estado: string = this.formulario.value.idUsuario ? 'modificado' : 'creado';
        this.messagesService.ventanaConfirmar('Éxito', `Alumno ${this.formulario.value.nombre} ${estado}`);
        this.router.navigate(['administrar/alumnos'], {replaceUrl: true});
      }, error => {
        this.messagesService.ventanaError('Atención', 'No se pudo guardar el Alumno');
      });
    } else {
      this.messagesService.ventanaError('Atención', 'formulario invalido');
    }
  }

  ionViewDidLeave() {
    this.formulario.reset();
    this.store.dispatch(new ResetUsuario());
  }

  setearFecha($event: string) {
    var fecha = $event.split('T');
    this.formulario.controls.fechaNacimiento.setValue(fecha[0]);
  }
}
