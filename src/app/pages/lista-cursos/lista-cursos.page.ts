import { Component, OnInit } from '@angular/core';
import {CursosService} from '../../services/cursos.service';
import {Curso} from '../../model/Curso';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Usuario} from '../../model/Usuario';
import {UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.page.html',
  styleUrls: ['./lista-cursos.page.scss'],
})
export class ListaCursosPage implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueado: Observable<Usuario>;
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
