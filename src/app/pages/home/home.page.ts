import {Component, OnInit} from '@angular/core';
import {CursosService} from '../../services/cursos.service';
import {Curso} from '../../model/Curso';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  cursos: Curso[] = [];
  constructor(private cursoService: CursosService) {}

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    // this.cursoService.getCursos().subscribe(value => this.cursos = value);
  }

}
