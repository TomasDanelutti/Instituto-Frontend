import { Component, OnInit } from '@angular/core';
import {Programa} from '../../../model/Programa';
import {ProgramaService} from '../../../services/programa.service';
import {Router} from '@angular/router';
import {MessagesService} from '../../../services/messages.service';
import {Store} from "@ngxs/store";
import {SetProgramaAction} from "../../../state/states/programa.state";

@Component({
  selector: 'app-programas',
  templateUrl: './programas.page.html',
  styleUrls: ['./programas.page.scss'],
})
export class ProgramasPage implements OnInit {
  programas: Programa[] = [];
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
    this.messagesService.showAlert('Atención', `¿Desea eliminar el programa  ${programa.nombre}?`, () => {
      this.programaService.eliminarPrograma(programa).subscribe(value => {
          this.messagesService.showMessage('Éxito', 'Programa eliminado con exito', 5000);
          this.buscarProgramas();
      }, error => {
        this.messagesService.showMessage('Atención', 'No se pudo eliminar el programa', 5000);
      });
    });
  }
}
