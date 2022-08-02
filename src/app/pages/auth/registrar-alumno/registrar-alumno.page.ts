import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registrar-alumno',
  templateUrl: './registrar-alumno.page.html',
  styleUrls: ['./registrar-alumno.page.scss'],
})
export class RegistrarAlumnoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

    volver() {
      this.router.navigate(['/login'], {replaceUrl: true});
    }
}
