import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from '../../../../model/Usuario';
import {ColumnaTable} from "../../cursos/cursos.page";
import {Alumno} from "../../../../model/Alumno";
import {SetUsuarioAction} from "../../../../state/states/usuario.state";
import {Store} from "@ngxs/store";
import {Empleado} from "../../../../model/Empleado";
import {EmpleadoService} from "../../../../services/empleado.service";
import {map, mergeMap} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  empleados: Usuario[] = [];
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  empleadosTable: any[] = [];
  page: number
  paginador: boolean;
  buscador: FormControl;

  constructor(private router: Router,
              private empleadoService: EmpleadoService,
              private store: Store) { }

  ngOnInit() {
    this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'apellido', header: 'Apellido'},  {field: 'dni', header: 'DNI'} ,{field: 'puesto', header: 'Puesto'} ,{field: 'activo', header: 'Estado'}];
    this.buscador = new FormControl();
  }

  buscarAdministrativosPaginados(numPage: number) {
    this.empleadoService.contarEmpleados(this.buscador.value)
        .pipe(mergeMap(cantidadElementos => this.empleadoService
            .getEmpleadosPaginados(numPage, 5, this.buscador.value)
            .pipe(map(empleados => {
              this.paginador = cantidadElementos > 5;
              this.totalRegistrosBackend = cantidadElementos;
              this.empleados = empleados;
              this.empleadosTable = empleados.map((empleado: Empleado) => {
                return {
                  id: empleado.idPersona,
                  imagen: empleado.imagen?.foto,
                  nombre: empleado.nombre,
                  apellido: empleado.apellido,
                  puesto: empleado.puesto,
                  dni: empleado.dni,
                  activo: empleado.activo ? "Activo" : "Inactivo"
                }
              })
            })))).subscribe();
  }

  loadData($event: number) {
    this.page = $event;
    this.buscarAdministrativosPaginados($event)
  }

  editarAdministrativo(idUsuario: number) {
    const alumnoSeleccionado = this.empleados.find(
        (alumnoSelected: Alumno) => idUsuario === alumnoSelected.idPersona);
    this.store.dispatch(new SetUsuarioAction(alumnoSeleccionado as Empleado));
    this.router.navigate(['administrar/empleados/crear-modificar-empleado']);
  }

  crearAdministrativo() {
      this.router.navigate(['administrar/empleados/crear-modificar-empleado']);
  }

  buscar(buscador: any) {
    if (buscador.length > 3) {
      this.buscarAdministrativosPaginados(this.page)
    } else if (buscador.length === 0){
      this.buscarAdministrativosPaginados(this.page);
    }
  }
}
