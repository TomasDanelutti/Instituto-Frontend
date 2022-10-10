import {Component, Input, OnInit} from '@angular/core';
import {Datos} from "../../../pages/lista-cursos/lista-cursos.page";
import {Curso} from "../../../model/Curso";
import {InscripcionService} from "../../../services/inscripcion.service";
import {Inscripcion} from "../../../model/Inscripcion";
import {Select} from "@ngxs/store";
import {UsuarioLogueadoState} from "../../../state/states/usuarioLogueado.state";
import {Observable} from "rxjs";
import {Usuario} from "../../../model/Usuario";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-tabla-lista-cursos',
  templateUrl: './tabla-lista-cursos.component.html',
  styleUrls: ['./tabla-lista-cursos.component.scss'],
})
export class TablaListaCursosComponent implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueado: Observable<Usuario>;
  @Input() cursos: Datos[] = []
  usuario: Usuario = new Usuario();

  constructor(
      private inscripcionService: InscripcionService,
      private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.usuarioLogueado.subscribe(usuario => this.usuario = usuario);
  }

  inscribirse(curso: Curso) {
    console.log(curso)
    let inscripcion: Inscripcion;
    inscripcion.Curso = curso;
    inscripcion.Usuario = this.usuario;
    this.inscripcionService.inscribirse(inscripcion).subscribe(() => {
      this.messagesService.ventanaExitosa('Éxito', `Te has inscripto correctamente al curso ${curso.nombre}`);
    },error => this.messagesService.ventanaError('Atención', 'Ha ocurrido un error con tu inscripcion. Por favor contactate con  bedelia. Gracias'));

  }

  desinscribirse(curso: Curso) {
    this.messagesService.ventanaError('Atención', 'Para desinscribirte de un curso debes contactarte con bedelia. Gracias')

  }
}
