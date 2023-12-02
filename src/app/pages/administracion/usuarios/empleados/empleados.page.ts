import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ColumnaTable} from "../../cursos/cursos.page";
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
  empleados: Empleado[] = [];
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  empleadosTable: any[] = [];
  page: number
  paginador: boolean;
  buscador: FormControl;
  dialogEmpleado = false;

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
              });
            })))).subscribe();
  }

  loadData($event: number) {
    this.page = $event;
    this.buscarAdministrativosPaginados($event)
  }

  editarAdministrativo(idUsuario: number) {
    const empleadoSeleccionado = this.empleados.find(
        (empleadoSelected: Empleado) => idUsuario === empleadoSelected.idPersona);
    this.store.dispatch(new SetUsuarioAction(empleadoSeleccionado));
    this.dialogEmpleado = true;
  }

  crearAdministrativo() {
    this.dialogEmpleado = true;
  }

  buscar(buscador: any) {
    if (buscador.length > 3) {
      this.buscarAdministrativosPaginados(this.page)
    } else if (buscador.length === 0){
      this.buscarAdministrativosPaginados(this.page);
    }
  }

  cancelEmpleado($event: boolean) {
    this.dialogEmpleado = $event;
  }

  GuardarEmpleaddo($event: boolean) {
    this.dialogEmpleado = $event;
    this.buscarAdministrativosPaginados(this.page);
  }
}
