import { Component, OnInit } from '@angular/core';
import {CursosService} from '../../services/cursos.service';
import {Curso} from '../../model/Curso';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Usuario} from '../../model/Usuario';
import {SetCursosInscriptos, UsuarioLogueadoState} from '../../state/usuarioLogueado.state';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  @Select(UsuarioLogueadoState.getUsuario) usuarioLogueado: Observable<Usuario>;
  @Select(UsuarioLogueadoState.getCursosInscriptos) cursosInscriptosState: Observable<Curso[]>;
  @Select(UsuarioLogueadoState.getCursosNoInscriptos) cursosNoInscriptosState: Observable<Curso[]>;
  usuario: Usuario;
  cursosNoInscriptos: Curso[] = [];
  cursosInscriptos: Curso[] = [];
  constructor(private cursoService: CursosService, private store: Store) { }

  ngOnInit() {
    this.usuarioLogueado.subscribe(value => this.usuario = value);
    this.cursosInscriptosState.subscribe(value => this.cursosInscriptos = value);
    this.cursosNoInscriptosState.subscribe(value => this.cursosNoInscriptos = value);
  }

}
