import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from '../../../../model/Usuario';
import {ColumnaTable} from "../../cursos/cursos.page";
import {AlumnoService} from "../../../../services/alumno.service";
import {Alumno} from "../../../../model/Alumno";
import {SetUsuarioAction} from "../../../../state/states/usuario.state";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  alumnos: Usuario[] = [];
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  alumnosTable: any[] = [];
  page: number
  paginador: boolean;
  constructor(private router: Router,
              private alumnoService: AlumnoService,
              private store: Store) { }

  ngOnInit() {
    this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'apellido', header: 'Apellido'}, {field: 'dni', header: 'DNI'}];
    this.paginador = true;
  }

  buscarAlumnosPaginados(numPage: number, cant: number) {
    this.contarAlumnos();
    this.alumnoService.getAlumnosPaginados(numPage, cant).subscribe(value => {
      this.alumnos = value;
      this.alumnosTable= [];
      value.forEach((item: Alumno) => {
        const auxObjeto = {
          id: item.idUsuario,
          imagen: item.imagen.foto,
          nombre: item.nombre,
          apellido: item.apellido,
          dni: item.dni
        };
        this.alumnosTable.push(auxObjeto);
      });
    });
  }

  contarAlumnos() {
    this.alumnoService.contarAlumnos().subscribe(value => this.totalRegistrosBackend = value);
  }

  loadData($event: number) {
    this.page = $event;
    this.buscarAlumnosPaginados($event,5)
  }

  editarAlumno(idUsuario: number) {
    const alumnoSeleccionado = this.alumnos.find(
        (alumnoSelected: Alumno) => idUsuario === alumnoSelected.idUsuario);
    this.store.dispatch(new SetUsuarioAction(alumnoSeleccionado));
    this.router.navigate(['administrar/alumnos/crear-modificar-alumno'], { replaceUrl: true });
  }

  crearAdministrativo() {
      this.router.navigate(['administrar/alumnos/crear-modificar-alumno'], {replaceUrl: true});
    }

  buscar(buscador: any) {
    if (buscador) {
      this.alumnoService.getAlumnoByNombre(buscador).subscribe(value => {
        this.paginador = false;
        this.alumnos = [];
        this.alumnos = value;
        this.alumnosTable = [];
        value.forEach((item: Alumno) => {
          const auxObjeto = {
            id: item.idUsuario,
            imagen: item.imagen.foto,
            nombre: item.nombre,
            apellido: item.apellido,
            dni: item.dni
          };
          this.alumnosTable.push(auxObjeto);
        });
      });
    } else {
      this.buscarAlumnosPaginados(this.page, 5);
      this.paginador = true;
    }
  }
}
