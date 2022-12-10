import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Usuario} from "../../../model/Usuario";
import {Curso} from "../../../model/Curso";

@Component({
  selector: 'app-dialog-docente',
  templateUrl: './dialog-docente.component.html',
  styleUrls: ['./dialog-docente.component.scss'],
})
export class DialogDocenteComponent implements OnInit {
  @Output() showDialogConsultaVistaPrevia = new EventEmitter<boolean>();
  @Input() curso: Curso;
  alumnos: Usuario[] = [];
  display: boolean = false;
  header = '';


  constructor() { }

  ngOnInit() {
    this.header = this.curso.nombre.toString();
    this.display = true;
    console.log(this.curso)
  }


  hideDialogConsultaVistaPrevia() {
    this.showDialogConsultaVistaPrevia.emit(false);
  }

}
