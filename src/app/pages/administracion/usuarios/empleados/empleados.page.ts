import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from '../../../../model/Usuario';
import {ColumnaTable} from "../../cursos/cursos.page";
import {Alumno} from "../../../../model/Alumno";
import {SetUsuarioAction} from "../../../../state/states/usuario.state";
import {Store} from "@ngxs/store";
import {Empleado} from "../../../../model/Empleado";
import {EmpleadoService} from "../../../../services/empleado.service";

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

  constructor(private router: Router,
              private empleadoService: EmpleadoService,
              private store: Store) { }

  ngOnInit() {
    this.cols = [{field: 'nombre', header: 'Nombre'},{field: 'apellido', header: 'Apellido'},  {field: 'dni', header: 'DNI'} ,{field: 'puesto', header: 'Puesto'} ,{field: 'activo', header: 'Estado'}];
    this.paginador = true;
  }

  ionViewWillEnter() {
    this.buscarAdministrativosPaginados(this.page,5);
  }

  buscarAdministrativosPaginados(numPage: number, cant: number) {
    this.contarAdministrativos();
    this.empleadoService.getEmpleadosPaginados(numPage, cant).subscribe(value => {
      this.empleados = value;
      this.empleadosTable = [];
      value.forEach((item: Empleado) => {
        const auxObjeto = {
          id: item.idUsuario,
          imagen: item.imagen?.foto,
          nombre: item.nombre,
          apellido: item.apellido,
          puesto: item.puesto,
          dni: item.dni,
          activo: item.activo ? "Activo" : "Inactivo"
        };
        this.empleadosTable.push(auxObjeto);
      });
    });
  }

  contarAdministrativos() {
    this.empleadoService.contarEmpleados().subscribe(value => this.totalRegistrosBackend = value);
  }

  loadData($event: number) {
    this.page = $event;
    this.buscarAdministrativosPaginados($event,5)
  }

  editarAdministrativo(idUsuario: number) {
    const alumnoSeleccionado = this.empleados.find(
        (alumnoSelected: Alumno) => idUsuario === alumnoSelected.idUsuario);
    this.store.dispatch(new SetUsuarioAction(alumnoSeleccionado as Empleado));
    this.router.navigate(['administrar/empleados/crear-modificar-empleado']);
  }

  crearAdministrativo() {
      this.router.navigate(['administrar/empleados/crear-modificar-empleado']);
  }

  buscar(buscador: any) {
    if (buscador) {
      this.empleadoService.getEmpleadosByNombre(buscador).subscribe(value => {
        this.paginador = false;
        this.empleados = [];
        this.empleados = value;
        this.empleadosTable = [];
        value.forEach((item: Empleado) => {
          const auxObjeto = {
            id: item.idUsuario,
            imagen: item.imagen?.foto,
            nombre: item.nombre,
            apellido: item.apellido,
            puesto: item.puesto,
            dni: item.dni,
            activo: item.activo ? "Activo" : "Inactivo"
          };
          this.empleadosTable.push(auxObjeto);
        });
      });
    } else {
      this.buscarAdministrativosPaginados(this.page, 5);
      this.paginador = true;
    }
  }
}
