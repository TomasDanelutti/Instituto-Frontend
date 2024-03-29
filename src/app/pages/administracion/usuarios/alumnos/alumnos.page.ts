import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ColumnaTable} from "../../cursos/cursos.page";
import {AlumnoService} from "../../../../services/alumno.service";
import {Alumno} from "../../../../model/Alumno";
import {SetUsuarioAction} from "../../../../state/states/usuario.state";
import {Store} from "@ngxs/store";
import {map, mergeMap} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {Persona} from "../../../../model/Persona";

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  alumnos: Alumno[] = [];
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  alumnosTable: any[] = [];
  page: number
  paginador: boolean;
  buscador: FormControl
  dialogAlumno = false;
  constructor(private router: Router,
              private alumnoService: AlumnoService,
              private store: Store) { }

  ngOnInit() {
    this.buscador = new FormControl();
    this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'apellido', header: 'Apellido'}, {field: 'dni', header: 'DNI'}];
    this.paginador = true;
  }

  buscarAlumnosPaginados(numPage: number) {
    this.alumnoService.contarAlumnos(this.buscador.value)
        .pipe(mergeMap(cantidadElementos => this.alumnoService
            .getAlumnosPaginados(numPage, 5, this.buscador.value)
            .pipe(map(alumnos => {
              this.paginador = cantidadElementos > 5;
              this.totalRegistrosBackend = cantidadElementos;
              this.alumnos = alumnos;
              this.alumnosTable = alumnos.map((alumno: Alumno) => {
                return {
                  id: alumno.idPersona,
                  imagen: alumno.imagen.foto,
                  nombre: alumno.nombre,
                  apellido: alumno.apellido,
                  dni: alumno.dni
                }
              })
            })))).subscribe();
  }

  loadData($event: number) {
    this.page = $event;
    this.buscarAlumnosPaginados($event)
  }

  cancelAlumno($event: boolean) {
    this.dialogAlumno = $event;
  }

  GuardarAlummno($event: boolean) {
    this.dialogAlumno = $event;
    this.buscarAlumnosPaginados(this.page);
  }

  editarAlumno(idUsuario: number) {
    const alumnoSeleccionado = this.alumnos.find(
        (alumnoSelected: Alumno) => idUsuario === alumnoSelected.idPersona);
    this.store.dispatch(new SetUsuarioAction(alumnoSeleccionado));
    this.dialogAlumno = true;
  }

  buscar(buscador: any) {
    if (buscador.length > 3) {
      this.buscarAlumnosPaginados(0);
    } else  if (buscador.length === 0){
      this.buscarAlumnosPaginados(0);
    }
  }
}
