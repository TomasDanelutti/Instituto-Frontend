import { Component, OnInit } from '@angular/core';
import {CursosService} from '../../services/cursos.service';
import {Curso} from '../../model/Curso';
import {InscripcionService} from '../../services/inscripcion.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {
  ngOnInit(): void {
  }


}
