import { Component, OnInit } from '@angular/core';
import {Curso} from '../../model/Curso';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {CursosService} from "../../services/cursos.service";
import {Usuario} from "../../model/Usuario";

export class Datos{
  idCurso: number;
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
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueadoState: Observable<Usuario>;
  @Select(UsuarioLogueadoState.getCursosNoInscriptos) sa: Observable<Curso[]>;
  cursosNoInscriptos: Curso[] = [];
  cursosInscriptos: Curso[] = [];
  cursos: Datos[] = [];

  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    this.usuarioLogueadoState.subscribe((usuarioState: Usuario) => {
      console.log(usuarioState)
      this.cursosService.getCursoInscriptosByUsuario(usuarioState.idUsuario)
          .subscribe(cursos => this.cursosInscriptos = cursos);
      this.cursosService.getCursoNoInscriptosByUsuario(usuarioState.idUsuario)
          .subscribe(cursos => {
            this.cursosNoInscriptos = cursos;
            this.armarDatos();
          });
    })
    console.log(this.cursosNoInscriptos);
    console.log(this.cursosInscriptos);
  }

  armarDatos() {
    this.cursosNoInscriptos.forEach(curso => {
      this.cursos.push(<Datos>{inscripto: false, idCurso: curso.idCurso, nombre: curso.nombre, profesor: curso.profesor, imagen: curso.imagen.foto})
    })
    this.cursosInscriptos.forEach(curso => {
      this.cursos.push(<Datos>{inscripto: true, idCurso: curso.idCurso, nombre: curso.nombre, profesor: curso.profesor, imagen: curso.imagen.foto})
    })
  }
}
