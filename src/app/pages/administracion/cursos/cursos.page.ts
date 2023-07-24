import {Component, OnDestroy, OnInit} from '@angular/core';
import {Curso} from '../../../model/Curso';
import {CursosService} from '../../../services/cursos.service';
import {InscripcionService} from '../../../services/inscripcion.service';
import {Router} from '@angular/router';
import {Store} from "@ngxs/store";
import {MessagesService} from "../../../services/messages.service";
import {SetCursoAction} from "../../../state/states/curso.state";
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, mergeMap} from "rxjs/operators";


export class ColumnaTable {
  field: string;
  header: string;
}
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  cursos: Curso[] = [];
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  cursosTable: any[] = [];
  page: number
  paginador: boolean;
  buscador: FormControl;
  dialogCursos = false;
  constructor(private cursoService: CursosService,
              private inscripcionService: InscripcionService,
              private router: Router,
              private store: Store,
              private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.buscador = new FormControl();
    this.paginador = true;
    this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'profesor', header: 'Profesor'},{field: 'turno', header: 'Turno'}];
  }

  buscarCursosPaginados(numPage: number) {
    this.cursoService.contarCursos(this.buscador.value)
        .pipe(mergeMap(cantidadElementos => this.cursoService
            .getCursosPaginado(numPage, 5, this.buscador.value)
            .pipe(map(cursos => {
              this.paginador = cantidadElementos > 5;
              this.totalRegistrosBackend = cantidadElementos;
              this.cursos = cursos;
              this.cursosTable = cursos.map((curso: Curso) => {
                return {
                  id: curso.idCurso,
                  nombre: curso.nombre,
                  profesor: curso.profesor.nombre,
                  turno: curso.turno,
                  imagen: curso.imagen.foto
                }
              })
            })))).subscribe();
  }

  loadData($event: number) {
    this.page = $event;
    this.buscarCursosPaginados($event)
  }


  crearCurso() {
    this.dialogCursos = true;
  }

  modificar(idCurso: number) {
    const cursoSeleccionado = this.cursos.find(
        (cursoSelected: Curso) => idCurso === cursoSelected.idCurso);
    this.store.dispatch(new SetCursoAction(cursoSeleccionado));
    this.dialogCursos = true;
  }

  eliminar(idCurso: number) {
    this.cursoService.eliminarCurso(idCurso).subscribe(() => {
      this.messagesService.ventanaExitosa('Éxito', 'Curso eliminado con exito');
      this.buscarCursosPaginados(this.page);
    }, error => {
      this.messagesService.ventanaError('Atención', 'No se pudo eliminar el curso');
    });
  }

  cancelCurso($event: boolean) {
    this.dialogCursos = false;

  }

  GuardarCurso($event: boolean) {
    this.dialogCursos = false;
    this.buscarCursosPaginados(this.page);
  }

  buscar(buscador: any) {
    if (buscador.length > 3 ) {
      this.buscarCursosPaginados(0);
    }
    else if (buscador.length === 0) {
      this.buscarCursosPaginados(0);
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}
