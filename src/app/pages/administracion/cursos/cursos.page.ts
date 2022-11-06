import { Component, OnInit } from '@angular/core';
import {Curso} from '../../../model/Curso';
import {CursosService} from '../../../services/cursos.service';
import {InscripcionService} from '../../../services/inscripcion.service';
import {Router} from '@angular/router';
import {Store} from "@ngxs/store";
import {MessagesService} from "../../../services/messages.service";
import {SetCursoAction} from "../../../state/states/curso.state";


export class ColumnaTable {
  field: string;
  header: string;
}
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  cursos: Curso[] = [];
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  cursosTable: any[] = [];
  page: number
  paginador: boolean;
  constructor(private cursoService: CursosService,
              private inscripcionService: InscripcionService,
              private router: Router,
              private store: Store,
              private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.paginador = true;
    this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'profesor', header: 'Profesor'},{field: 'turno', header: 'Turno'}];
  }

  buscarCursosPaginados(numPage: number, cant: number) {
    this.cursoService.getCursosPaginado(numPage, cant).subscribe(cursos => {
      console.log(cursos)
      this.cursos = cursos;
      this.cursosTable = [];
      cursos.forEach((item: Curso) => {
        const auxObjeto = {
          id: item.idCurso,
          nombre: item.nombre,
          profesor: item.profesor.nombre,
          turno: item.turno,
          imagen: item.imagen.foto
        };
        this.cursosTable.push(auxObjeto);
      });
    });
  }

  contarCursos() {
    this.cursoService.contarCursos().subscribe(
        value => this.totalRegistrosBackend = value);
  }

  loadData($event: number) {
    this.page = $event;
    this.buscarCursosPaginados($event,5)
    this.contarCursos();
  }


  crearCurso() {
    this.router.navigate(['administrar/cursos/crear-modificar-curso'], {replaceUrl: true});
  }

  modificar(idCurso: number) {
    const cursoSeleccionado = this.cursos.find(
        (cursoSelected: Curso) => idCurso === cursoSelected.idCurso);
    this.store.dispatch(new SetCursoAction(cursoSeleccionado));
    this.router.navigate(['administrar/cursos/crear-modificar-curso'], { replaceUrl: true });
  }

  eliminar(idCurso: number) {
    this.cursoService.eliminarCurso(idCurso).subscribe(() => {
      this.messagesService.ventanaExitosa('Éxito', 'Curso eliminado con exito');
      this.buscarCursosPaginados(this.page, 5);
    }, error => {
      this.messagesService.ventanaError('Atención', 'No se pudo eliminar el curso');
    });
  }

  buscar(buscador: any) {
    if (buscador) {
      this.cursoService.getCursoByNombre(buscador).subscribe(value => {
        this.cursos = [];
        this.cursosTable = [];
        this.cursos = value;
        value.forEach((item: Curso) => {
          const auxObjeto = {
            id: item.idCurso,
            nombre: item.nombre,
            profesor: item.profesor.nombre,
            turno: item.turno,
            imagen: item.imagen.foto
          };
          this.cursosTable.push(auxObjeto);
          this.paginador = false;
        });
      });
    }
    else {
      this.buscarCursosPaginados(0,5);
      this.paginador = true;
    }
  }

}
