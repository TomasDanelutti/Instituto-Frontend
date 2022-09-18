import { Component, OnInit } from '@angular/core';
import {Curso} from '../../model/Curso';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';

export class Datos{
  inscripto: boolean;
  nombre: null;
  imagen: null;
  profesor: null
}

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.page.html',
  styleUrls: ['./lista-cursos.page.scss'],
})
export class ListaCursosPage implements OnInit {
  @Select(UsuarioLogueadoState.getCursosInscriptos) cursosInscriptosState: Observable<Curso[]>;
  @Select(UsuarioLogueadoState.getCursosNoInscriptos) cursosNoInscriptosState: Observable<Curso[]>;
  cursosNoInscriptos: Curso[] = [];
  cursosInscriptos: Curso[] = [];
  cursos: Datos[] = [];

  constructor() { }

  ngOnInit() {
    this.cursosInscriptosState.subscribe(value => this.cursosInscriptos = value);
    this.cursosNoInscriptosState.subscribe(value => this.cursosNoInscriptos = value);
    this.armarDatos();
  }

  armarDatos() {
    this.cursosNoInscriptos.forEach(curso => {
      this.cursos.push(<Datos>{inscripto: false, nombre: curso.nombre, profesor: curso.profesor, imagen: curso.imagen})
    })
    this.cursosInscriptos.forEach(curso => {
      this.cursos.push(<Datos>{inscripto: true, nombre: curso.nombre, profesor: curso.profesor, imagen: curso.imagen})
    })
    console.log(this.cursos);
  }
}
