import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Usuario} from "../../../model/Usuario";

@Component({
  selector: 'app-dialog-docente',
  templateUrl: './dialog-docente.component.html',
  styleUrls: ['./dialog-docente.component.scss'],
})
export class DialogDocenteComponent implements OnInit {
  @Output() showDialogConsultaVistaPrevia = new EventEmitter<boolean>();
  alumnos: Usuario[] = [];
  display: boolean = false;
  header = '';


  constructor() { }

  ngOnInit() {
    this.header = "Docente"
    this.display = true;
  }


  hideDialogConsultaVistaPrevia() {
    this.showDialogConsultaVistaPrevia.emit(false);
  }

}
