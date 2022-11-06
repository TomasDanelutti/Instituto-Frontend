import {Component, OnInit} from '@angular/core';
import {CursosService} from '../../services/cursos.service';
import {Curso} from '../../model/Curso';
import {Select} from "@ngxs/store";
import {UsuarioLogueadoState} from "../../state/states/usuarioLogueado.state";
import {Observable} from "rxjs";
import {Usuario} from "../../model/Usuario";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioState: Observable<Usuario>;
  cursos: Curso[] = [];
  constructor(private cursoService: CursosService) {}

  ngOnInit(): void {
    this.usuarioState.subscribe(value => {
      this.cursoService.getCursoNoInscriptosByUsuario(value.idUsuario).subscribe(value1 => this.cursos = value1);
    })
  }

  ionViewDidEnter() {
    // this.cursoService.getCursos().subscribe(value => this.cursos = value);
  }

}
