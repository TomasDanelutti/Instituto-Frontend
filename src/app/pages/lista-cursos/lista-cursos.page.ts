import { Component, OnInit } from '@angular/core';
import {Curso} from '../../model/Curso';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {CursosService} from "../../services/cursos.service";
import {ColumnaTable} from "../administracion/cursos/cursos.page";
import {InscripcionService} from "../../services/inscripcion.service";
import {MessagesService} from "../../services/messages.service";
import {SweetAlertResult} from "sweetalert2";
import {DesinscripcionService} from "../../services/desinscripcion.service";;
import {SetCantDesinscripcionesAction} from "../../state/states/desinscripcion.state";
import {Persona} from "../../model/Persona";
import {map, mergeMap} from "rxjs/operators";
import {InformacionParaTabla} from "../../model/InformacionParaTabla";

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.page.html',
  styleUrls: ['./lista-cursos.page.scss'],
})
export class ListaCursosPage implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueadoState: Observable<Persona>;
  cols: ColumnaTable[];
  cursosInscriptosTable: any[] = [];
  cantidadCursosInscriptos = 0;
  paginadorCursoInscriptos: boolean = true;
  cursosNoInscriptosTable: any[] = [];
  cantidadCursosNoInscriptos = 0;
  paginadorCursoNoInscriptos: boolean = true;
  persona: Persona = new Persona();
  cursos: Curso[] = [];

  constructor(
      private cursosService: CursosService,
      private inscripcionService: InscripcionService,
      private messagesService: MessagesService,
      private desinscripcionService: DesinscripcionService,
      private store: Store) { }

  ngOnInit() {
    this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'profesor', header: 'Profesor'},{field: 'turno', header: 'Turno'}];
    this.usuarioLogueadoState.subscribe((usuarioState: Persona) => this.persona = usuarioState);
    this.cursosService.getCursosByPersonaAndNombre(0, 5, false).subscribe(cursos => console.log(cursos));
  }


    getCursosInscriptos(numPage: number, pageSize: number) {
        this.getCursos(numPage, pageSize, true).subscribe((informacionParaTabla: InformacionParaTabla<Curso>) => {
            this.cantidadCursosInscriptos = informacionParaTabla.cantidadElementos;
            this.paginadorCursoInscriptos = this.cantidadCursosInscriptos > 5;
            this.cursosInscriptosTable = informacionParaTabla.elementos.map(curso => {
                return {
                    id: curso.idCurso,
                    nombre: curso.nombre,
                    profesor: curso.profesor.nombre,
                    turno: curso.turno,
                    imagen: curso.imagen.foto,
                    inscripto: true
                };
            });
        });
    };

  getCursosNoInscriptos(numPage: number, pageSize: number) {
    this.getCursos(numPage, pageSize, false).subscribe((informacionParaTabla: InformacionParaTabla<Curso>) => {
      this.cantidadCursosNoInscriptos = informacionParaTabla.cantidadElementos;
        this.paginadorCursoNoInscriptos = this.cantidadCursosNoInscriptos > 5;
      this.cursosNoInscriptosTable = informacionParaTabla.elementos.map(curso => {
        return {
          id: curso.idCurso,
          nombre: curso.nombre,
          profesor: curso.profesor.nombre,
          turno: curso.turno,
          imagen: curso.imagen.foto,
          inscripto: false
        };
      });
    });
  }

  loadDataCursosInscriptos($event: number) {
    this.getCursosInscriptos($event, 5);
  }

  loadDataCursosNoInscriptos($event: number) {
    this.getCursosNoInscriptos($event, 5);
  }

  inscribirse(idCurso: number) {
    this.messagesService.ventanaConfirmar("Atencion", "Estas seguro que deseas inscribirte al curso?").then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.inscripcionService.inscribirse(idCurso, this.persona.idPersona).subscribe(respuesta => {
          this.messagesService.ventanaExitosa('Éxito', respuesta.mensaje);
          // this.buscarIdCursosInscriptos(this.page,5);
      },error => this.messagesService.ventanaError("Atención", error.error));
    }});
  }

  desinscribirse(idCurso: number) {
  this.messagesService.ventanaVerificacionMotivo().then((motivo) => {
    if (motivo) {
      this.crearToken(idCurso, motivo);
    }
    // this.buscarIdCursosInscriptos(this.page,5);
  });
  }

  crearToken(idCurso: number, motivo: string) {
    this.desinscripcionService.getTokenDesinscripcion(idCurso, this.persona.idPersona, motivo).subscribe(() => {
    }, error => this.messagesService.ventanaError("Atención", error.error));
    this.messagesService.ventanaVerificacionToken().then((token) => {;
      this.guardarDesinscripcion(idCurso, this.persona.idPersona, motivo, token);
    })
  }

  guardarDesinscripcion(idCurso: number, idAlumno: number, motivo: string, token: string) {
    this.desinscripcionService.guardarDesinscripcion(idCurso, idAlumno, motivo, token).subscribe(respuesta => {
      this.messagesService.ventanaExitosa("Exitó", respuesta.mensaje);
      this.store.dispatch(new SetCantDesinscripcionesAction());
    }, error => this.messagesService.ventanaError("Atención", error.error));
  }

  ver(idCurso: number) {
    
  }

  getCursos(numPage: number, pageSize: number, inscripto: boolean) {
    return this.cursosService.countCursosInscriptosByUsuario(false)
        .pipe(mergeMap(cantidadElementos => this.cursosService.
        getCursosByPersonaAndNombre(numPage, pageSize, inscripto).pipe(map(cursos => new InformacionParaTabla(cantidadElementos, cursos)))));
  }

  ionViewWillLeave() {
  }
}
