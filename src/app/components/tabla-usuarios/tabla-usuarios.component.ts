import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from '../../model/Usuario';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss'],
})
export class TablaUsuariosComponent implements OnInit {
  @Input() usuarios: Usuario[];
  constructor() { }

  ngOnInit() {}

  modificar(usuario: any) {

  }

    eliminar(usuario: any) {

    }
}
