import { Component, OnInit } from '@angular/core';
import {Programa} from '../../../model/Programa';
import {ProgramaService} from '../../../services/programa.service';
import {Router} from '@angular/router';
import {MessagesService} from '../../../services/messages.service';
import {Store} from "@ngxs/store";
import {SetProgramaAction} from "../../../state/states/programa.state";
import {ColumnaTable} from "../cursos/cursos.page";

@Component({
  selector: 'app-programas',
  templateUrl: './programas.page.html',
  styleUrls: ['./programas.page.scss'],
})
export class ProgramasPage implements OnInit {
  programas: Programa[] = [];
  cols: ColumnaTable[];
  totalRegistrosBackend = 1;
  programasTable: any[] = [];
  page: number
  paginador: boolean;
  constructor(
      private programaService: ProgramaService,
      private router: Router,
      private messagesService: MessagesService,
      private store: Store) { }

  ngOnInit() {
    this.paginador = true;
    this.cols = [{field: 'nombre', header: 'Nombre'}];
  }

  buscarProgramasPaginados(numPage: number, cant: number) {
    this.programaService.getProgramasPaginado(numPage, cant).subscribe(value => {
      this.programas = value;
      this.programasTable = [];
      value.forEach((item: Programa) => {
        const auxObjeto = {
          id: item.idPrograma,
          nombre: item.nombre,
        };
        this.programasTable.push(auxObjeto);
      });
    });
  }

  crearPrograma() {
    this.router.navigate(['administrar/programas/crear-modificar-programa'], {replaceUrl: true});
  }

  modificar(idPrograma: number) {
    const programaSeleccionado = this.programas.find(
        (programaSelected: Programa) => idPrograma === programaSelected.idPrograma);
    this.store.dispatch(new SetProgramaAction(programaSeleccionado));
    this.router.navigate(['administrar/programas/crear-modificar-programa'], { replaceUrl: true });
  }

  eliminar(idPrograma: number) {
    this.programaService.eliminarPrograma(idPrograma).subscribe(value => {
      this.messagesService.ventanaExitosa('Éxito', 'Programa eliminado con exito');
      this.buscarProgramasPaginados(this.page,5);
    }, error => {
      this.messagesService.ventanaError('Atención', 'No se pudo eliminar el programa');
    });
  }

  contarProgramas() {
    this.programaService.contarProgramas().subscribe(value => this.totalRegistrosBackend = value);
  }

  loadData($event: number) {
    this.page = $event;
    this.buscarProgramasPaginados($event,5)
    this.contarProgramas();
  }

  buscar(buscador: any) {
    if (buscador) {
      this.programaService.getProgramaByNombre(buscador).subscribe(value => {
        this.programas = value;
        this.programasTable = [];
        value.forEach((item: Programa) => {
          const auxObjeto = {
            id: item.idPrograma,
            nombre: item.nombre,
          };
          this.programasTable.push(auxObjeto);
        });
      });
    }
    else {
      this.buscarProgramasPaginados(0,5);
    }
  }
}
