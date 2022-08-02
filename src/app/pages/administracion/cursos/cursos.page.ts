import { Component, OnInit } from '@angular/core';
import {Curso} from '../../../model/Curso';
import {CursosService} from '../../../services/cursos.service';
import {InscripcionService} from '../../../services/inscripcion.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  cursos: Curso[] = [];
  constructor(private cursoService: CursosService,
              private inscripcionService: InscripcionService,
              private router: Router) {}

  ngOnInit(): void {
  }

  ionViewWillEnter(){
    this.cursoService.getCursos().subscribe(value => this.cursos = value);
  }

  crearCurso() {
    this.router.navigate(['administrar/cursos/crear-modificar-curso'], {replaceUrl: true});
  }
}
