import {Component, OnInit} from '@angular/core';
import {CursosService} from '../../services/cursos.service';
import {Curso} from '../../model/Curso';
import {Select} from "@ngxs/store";
import {UsuarioLogueadoState} from "../../state/states/usuarioLogueado.state";
import {Observable} from "rxjs";
import {Persona} from "../../model/Persona";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioState: Observable<Persona>;
  cursos: Curso[] = [];
  constructor(private cursoService: CursosService) {}

  ngOnInit(): void {
    this.usuarioState.subscribe(value => {
      this.cursoService.getCursosPaginado(0,5).subscribe(cursos => console.log(cursos))
    })
  }


}
