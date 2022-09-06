import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProgramaService} from '../../../../services/programa.service';
import {Programa} from '../../../../model/Programa';
import {MessagesService} from '../../../../services/messages.service';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {ProgramaState, ResetPrograma} from "../../../../state/states/programa.state";
import {SetCursosInscriptos, SetCursosNoInscriptos} from "../../../../state/states/usuarioLogueado.state";

@Component({
  selector: 'app-crear-modificar-programa',
  templateUrl: './crear-modificar-programa.page.html',
  styleUrls: ['./crear-modificar-programa.page.scss'],
})
export class CrearModificarProgramaPage implements OnInit {
  @Select(ProgramaState.getCurso) programaState: Observable<Programa>;
  formulario: FormGroup;
  cardHeader: string;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private porgramaService: ProgramaService,
      private messagesService: MessagesService,
      private store: Store) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      idPrograma: [],
      nombre: [Validators.required],
      descripcion: [Validators.required],
    });
      this.programaState.subscribe(programa => {
          if (programa) {
              this.formulario.patchValue(programa);
          }
          else {
              this.formulario.reset();
          }
          this.cardHeader = this.formulario.value.idCurso ? 'Modificar programa' : 'Crear programa';
      });
  }

    volver() {
      this.router.navigate(['/administrar/programas'], {replaceUrl: true});
    }

  guardarPrograma() {
      if (this.formulario.valid) {
          this.porgramaService.guardarPrograma(this.formulario.value).subscribe(rta => {
              const estado: string = this.formulario.value.idPrograma ? 'modificado' : 'creado';
              this.messagesService.ventanaExitosa('Éxito', `Programa ${this.formulario.value.nombre} ${estado}`);
              this.router.navigate(['/administrar/programas'], {replaceUrl: true});
          }, error => {
              this.messagesService.ventanaErrorConFooter('Atención', 'No se pudo guardar el curso');
          });
      } else {
          this.messagesService.ventanaError('Atención', 'formulario invalido');
      }
  }

    ionViewDidLeave() {
        this.formulario.reset();
        this.store.dispatch(new ResetPrograma());
    }
}
