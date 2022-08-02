import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessagesService} from '../../../../../services/messages.service';
import {UsuarioService} from '../../../../../services/usuario.service';
import {Programa} from '../../../../../model/Programa';
import {Usuario} from '../../../../../model/Usuario';

@Component({
  selector: 'app-crear-modificar-alumno',
  templateUrl: './crear-modificar-alumno.page.html',
  styleUrls: ['./crear-modificar-alumno.page.scss'],
})
export class CrearModificarAlumnoPage implements OnInit {
  formulario: FormGroup;
  alumno: Usuario;

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
    // this.alumno = (await this.storage.get('alumno')) || new Usuario() && this.formulario.reset();
    if (this.alumno) {
      this.formulario.patchValue(this.alumno);
    }
  }

  volver() {
    this.router.navigate(['administrar/alumnos'], {replaceUrl: true});
  }

  guardarAlumno() {
    if (this.formulario.valid) {
      this.usuarioService.guardarAlumno(this.formulario.value).subscribe(rta => {
        this.messagesService.showMessage('Exito', 'Alumno guardado correctamente', 5000);
        this.router.navigate(['administrar/alumnos'], {replaceUrl: true});
      }, error => {
        this.messagesService.showMessage('Atención', 'No se pudo guardar el Alumno', 5000);
      });
    } else {
      this.messagesService.showMessage('Atención', 'formulario invalido', 5000);
    }
  }

  ionViewDidLeave() {
    this.formulario.reset();
    // this.storage.remove('alumno');
  }

  setearFecha($event: string) {
    var fecha = $event.split('T');
    this.formulario.controls.fechaNacimiento.setValue(fecha[0]);
  }
}
