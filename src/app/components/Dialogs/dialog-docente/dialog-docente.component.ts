import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Curso} from "../../../model/Curso";
import {Persona} from "../../../model/Persona";

@Component({
  selector: 'app-dialog-docente',
  templateUrl: './dialog-docente.component.html',
  styleUrls: ['./dialog-docente.component.scss'],
})
export class DialogDocenteComponent implements OnInit {
  @Output() showDialogConsultaVistaPrevia = new EventEmitter<boolean>();
  @Input() curso: Curso;
  alumnos: Persona[] = [];
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
