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

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.page.html',
  styleUrls: ['./lista-cursos.page.scss'],
})
export class ListaCursosPage implements OnInit {
  @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioLogueadoState: Observable<Persona>;
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  cursosTable: any[] = [];
  page: number
  persona: Persona = new Persona();
  cursos: Curso[] = [];
  idCursosInscriptos: number[] = [];
  cursosInscriptos: any[] = [];
  cursosNoInscriptos: any[] = [];

  constructor(
      private cursosService: CursosService,
      private inscripcionService: InscripcionService,
      private messagesService: MessagesService,
      private desinscripcionService: DesinscripcionService,
      private store: Store) { }

  ngOnInit() {
    this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'profesor', header: 'Profesor'},{field: 'turno', header: 'Turno'}];
    this.usuarioLogueadoState.subscribe((usuarioState: Persona) => this.persona = usuarioState);
    console.log(this.persona)
    this.cursosService.getCursoInscriptosByUsuario(this.persona.idPersona).subscribe(value => console.log(value))
    this.cursosService.getCursoNoInscriptosByUsuario(this.persona.idPersona).subscribe(value => console.log(value))
    this.buscarCursosInscriptos();
    this.buscarCursosNoInscriptos();
  }

  ionViewWillEnter() {
    this.buscarIdCursosInscriptos(0,5);
  }

  buscarCursosInscriptos() {
    this.cursosService.getCursoInscriptosByUsuario(this.persona.idPersona)
        .subscribe(cursosInscriptos => {
          cursosInscriptos.map(curso => {
            const auxObjeto = {
              id: curso.idCurso,
              nombre: curso.nombre,
              profesor: curso.profesor.nombre,
              turno: curso.turno,
              imagen: curso.imagen.foto,
              inscripto: true
            };
            this.cursosInscriptos.push(auxObjeto);
          })
        });
  }

  buscarCursosNoInscriptos() {
    this.cursosService.getCursoNoInscriptosByUsuario(this.persona.idPersona)
        .subscribe(cursosNoInscriptos => {
          cursosNoInscriptos.map(curso => {
            const auxObjeto = {
              id: curso.idCurso,
              nombre: curso.nombre,
              profesor: curso.profesor.nombre,
              turno: curso.turno,
              imagen: curso.imagen.foto,
              inscripto: false
            };
            this.cursosNoInscriptos.push(auxObjeto);
          })
        });
  }

  buscarIdCursosInscriptos(numPage: number, cant: number) {
    this.cursosService.getCursoInscriptosByUsuario(this.persona.idPersona)
        .subscribe(cursos => {
          this.idCursosInscriptos = [];
          this.cursos = cursos;
          cursos.forEach((item: Curso) => {
            this.idCursosInscriptos.push(item.idCurso);
          });
          this.buscarCursosPaginados(0,5);
        });
  }

  buscarCursosPaginados(numPage: number, cant: number) {
    this.cursosService.getCursosPaginado(numPage, cant).subscribe(cursos => {
      this.cursos = cursos;
      this.cursosTable = [];
      cursos.forEach((item: Curso) => {
        if (this.idCursosInscriptos.length) {
          this.idCursosInscriptos.forEach(idCurso => {
            if (idCurso === item.idCurso) {
              console.log("if")
              const auxObjeto = {
                id: item.idCurso,
                nombre: item.nombre,
                profesor: item.profesor.nombre,
                turno: item.turno,
                imagen: item.imagen.foto,
                inscripto: true
              };
              this.cursosTable.push(auxObjeto);
            }
            else {
              console.log("else")
              const auxObjeto = {
                id: item.idCurso,
                nombre: item.nombre,
                profesor: item.profesor.nombre,
                turno: item.turno,
                imagen: item.imagen.foto,
                inscripto: false
              };
              this.cursosTable.push(auxObjeto);
            }
          })
        }
        else {
          const auxObjeto = {
            id: item.idCurso,
            nombre: item.nombre,
            profesor: item.profesor.nombre,
            turno: item.turno,
            imagen: item.imagen.foto,
            inscripto: false
          };
          this.cursosTable.push(auxObjeto);
        }
      });
    });
  }

  contarCursos() {
    this.cursosService.contarCursos().subscribe(
        value => this.totalRegistrosBackend = value);
  }

  loadData($event: number) {
    this.page = $event;
    this.buscarIdCursosInscriptos($event,5)
    this.contarCursos();
  }

  inscribirse(idCurso: number) {
    this.messagesService.ventanaConfirmar("Atencion", "Estas seguro que deseas inscribirte al curso?").then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.inscripcionService.inscribirse(idCurso, this.persona.idPersona).subscribe(respuesta => {
          this.messagesService.ventanaExitosa('Éxito', respuesta.mensaje);
          this.buscarIdCursosInscriptos(this.page,5);
      },error => this.messagesService.ventanaError("Atención", error.error));
    }});
  }

  desinscribirse(idCurso: number) {
  this.messagesService.ventanaVerificacionMotivo().then((motivo) => {
    if (motivo) {
      this.crearToken(idCurso, motivo);
    }
    this.buscarIdCursosInscriptos(this.page,5);
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

  ionViewWillLeave() {
    this.cursosTable = [];
  }
}
