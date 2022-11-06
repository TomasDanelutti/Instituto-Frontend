import { Component, OnInit } from '@angular/core';
import {Curso} from '../../model/Curso';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {CursosService} from "../../services/cursos.service";
import {Usuario} from "../../model/Usuario";
import {InscripcionDTO} from "../../model/DTOS/InscripcionDTO";
import {ColumnaTable} from "../administracion/cursos/cursos.page";
import {InscripcionService} from "../../services/inscripcion.service";
import {MessagesService} from "../../services/messages.service";
import {SweetAlertResult} from "sweetalert2";
import {NotificacionDesinscripcionService} from "../../services/notificacion-desinscripcion.service";
import {NotificacionDesinscripcionDTO} from "../../model/DTOS/NotificacionDesinscripcionDTO";

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.page.html',
  styleUrls: ['./lista-cursos.page.scss'],
})
export class ListaCursosPage implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueadoState: Observable<Usuario>;
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  cursosTable: any[] = [];
  page: number
  usuario: Usuario = new Usuario();
  cursosNoInscriptos: Curso[] = [];
  cursosInscriptos: Curso[] = [];
  cursos: Curso[] = [];

  constructor(
      private cursosService: CursosService,
      private inscripcionService: InscripcionService,
      private messagesService: MessagesService,
      private notificacionDesinscripcion: NotificacionDesinscripcionService) { }

  ngOnInit() {
    this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'profesor', header: 'Profesor'},{field: 'turno', header: 'Turno'}];
    this.usuarioLogueadoState.subscribe((usuarioState: Usuario) => this.usuario = usuarioState);
  }

  ionViewWillEnter() {
    this.armarDatos();
  }

  armarDatos() {
    this.cursosService.getCursoInscriptosByUsuario(this.usuario.idUsuario)
        .subscribe(cursos => {
          this.cursosInscriptos = cursos;
          cursos.forEach((item: Curso) => {
            const auxObjeto = {
              id: item.idCurso,
              nombre: item.nombre,
              profesor: item.profesor.nombre,
              turno: item.turno,
              imagen: item.imagen.foto,
              inscripto: true
            };
            this.cursosTable.push(auxObjeto);
          });
        });
    this.cursosService.getCursoNoInscriptosByUsuario(this.usuario.idUsuario)
        .subscribe(cursos => {
          this.cursosNoInscriptos = cursos;
          cursos.forEach((item: Curso) => {
            const auxObjeto = {
              id: item.idCurso,
              nombre: item.nombre,
              profesor: item.profesor.nombre,
              turno: item.turno,
              imagen: item.imagen.foto,
              inscripto: false
            };
            this.cursosTable.push(auxObjeto);
          });
        });
    // this.cursos = this.cursosInscriptos;
    // this.cursos = this.cursosNoInscriptos;
    // var result = this.cursosTable.filter(el => !this.cursosNoInscriptos.includes(el));
    // this.cursos = result
  }

  inscribirse(idCurso: number) {
    this.messagesService.ventanaConfirmar("Atencion", "Estas seguro que deseas inscribirte al curso?").then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        let inscripcionDTO: InscripcionDTO = new InscripcionDTO();
        inscripcionDTO.idCurso = idCurso;
        inscripcionDTO.idUsuario = this.usuario.idUsuario;
        this.inscripcionService.inscribirse(inscripcionDTO).subscribe(respuesta => {
          this.messagesService.ventanaExitosa('Éxito', respuesta.mensaje);
          this.armarDatos();
      },error => this.messagesService.ventanaError("Atención", error.error));
    }});
  }

  desinscribirse(idCurso: number) {
  this.messagesService.ventanaVerificacionTelefono().then((motivo) => {
    if (motivo) {
      let notificacionDesinscripcion: NotificacionDesinscripcionDTO = new NotificacionDesinscripcionDTO();
      notificacionDesinscripcion.idCurso = idCurso;
      notificacionDesinscripcion.idAlumno = this.usuario.idUsuario;
      notificacionDesinscripcion.motivo = motivo;
      this.notificacionDesinscripcion.guardarNtificacionDsinscripcion(notificacionDesinscripcion).subscribe(respuesta => {
        this.messagesService.ventanaExitosa("Exitó", respuesta.mensaje);
      }, error => this.messagesService.ventanaError("Atención", error.error));
    }
  });
  }

  ver(idCurso: number) {
    
  }

  ionViewWillLeave() {
    this.cursosTable = [];
  }
}
