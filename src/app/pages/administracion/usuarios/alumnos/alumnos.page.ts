import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../../../../services/usuario.service';
import {Usuario} from '../../../../model/Usuario';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  alumnos: Usuario[] = [];
  constructor(private router: Router,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.usuarioService.getAlumnos().subscribe(value => this.alumnos = value);
  }

  crearAdministrativo() {
      this.router.navigate(['administrar/alumnos/crear-modificar-alumno'], {replaceUrl: true});
    }
}
