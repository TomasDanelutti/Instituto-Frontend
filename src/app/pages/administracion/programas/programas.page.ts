import { Component, OnInit } from '@angular/core';
import {Programa} from '../../../model/Programa';
import {ProgramaService} from '../../../services/programa.service';
import {Router} from '@angular/router';
import {MessagesService} from '../../../services/messages.service';
import {Store} from "@ngxs/store";
import {SetProgramaAction} from "../../../state/states/programa.state";
import {SweetAlertResult} from "sweetalert2";

@Component({
  selector: 'app-programas',
  templateUrl: './programas.page.html',
  styleUrls: ['./programas.page.scss'],
})
export class ProgramasPage implements OnInit {
  programas: Programa[] = [];
    buscador: any;
  constructor(
      private programaService: ProgramaService,
      private router: Router,
      private messagesService: MessagesService,
      private store: Store) { }

  ngOnInit() {
    this.buscarProgramas();
  }

  buscarProgramas() {
    this.programaService.getProgramas().subscribe(value => this.programas = value);
  }

  crearPrograma() {
    this.router.navigate(['administrar/programas/crear-modificar-programa'], {replaceUrl: true});
  }

  modificar(programa: Programa) {
    this.store.dispatch(new SetProgramaAction(programa));
    this.router.navigate(['administrar/programas/crear-modificar-programa'], { replaceUrl: true });
  }

  eliminar(programa: Programa) {
    this.messagesService.ventanaConfirmar('Atención', `¿Desea eliminar el programa  ${programa.nombre}?`)
        .then((result: SweetAlertResult) => {
          if (result.isConfirmed) {
            this.programaService.eliminarPrograma(programa).subscribe(value => {
              this.messagesService.ventanaExitosa('Éxito', 'Programa eliminado con exito');
            }, error => {
              this.messagesService.ventanaError('Atención', 'No se pudo eliminar el programa');
            });
          }
        });
  }

  buscar(buscador: any) {
    if (buscador) {
      this.programaService.getProgramaByNombre(buscador).subscribe(value => this.programas = value);
    }
    else {
      this.programaService.getProgramas().subscribe(value => this.programas = value);
    }
  }
}
