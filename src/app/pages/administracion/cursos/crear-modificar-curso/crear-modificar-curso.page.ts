import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CursosService} from '../../../../services/cursos.service';
import {MessagesService} from '../../../../services/messages.service';
import {Curso} from '../../../../model/Curso';
import {ImagenService} from '../../../../services/imagen.service';

@Component({
  selector: 'app-crear-modificar-curso',
  templateUrl: './crear-modificar-curso.page.html',
  styleUrls: ['./crear-modificar-curso.page.scss'],
})
export class CrearModificarCursoPage implements OnInit {
  archivos: any = [];
  formulario: FormGroup;
  curso: Curso;
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private cursoService: CursosService,
      private messagesService: MessagesService,
      private imagenService: ImagenService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      idCurso: [],
      nombre: [Validators.required],
      turno: [Validators.required],
      programa: [Validators.required],
      cupoMinimo: [Validators.required],
      cupoMaximo: [Validators.required],
      profesor: [Validators.required],
      imagen: []
    });
  }

  async ionViewWillEnter() {
    // this.curso = (await this.storage.get('curso')) || new Curso() && this.formulario.reset();
    if (this.curso) {
      this.formulario.patchValue(this.curso);
    }
  }

  volver() {
    this.router.navigate(['/administrar/cursos'], {replaceUrl: true});
    console.log(this.formulario.value.turno.value)
  }
  guardarCurso() {
    this.curso = this.formulario.value;
    if (this.formulario.valid) {
      this.cursoService.guardarCurso(this.formulario.value).subscribe(rta => {
        this.messagesService.showMessage('Exito', 'Curso guardado correctamente', 5000);
        this.router.navigate(['/administrar/cursos'], {replaceUrl: true});
      }, error => {
        this.messagesService.showMessage('Atención', 'No se pudo guardar el curso', 5000);
      });
    } else {
      this.messagesService.showMessage('Atención', 'formulario invalido', 5000);
    }
  }

  ionViewDidLeave() {
    this.formulario.reset();
    // this.storage.remove('curso');
  }

  capturarFoto($event): any {
    const archivoCapturado = $event.target.files[0];
    this.imagenService.extraerBase64(archivoCapturado).then((value: any) => {
      this.formulario.controls.imagen.setValue(value.base);
    });
    this.archivos.push(archivoCapturado);
  }
}
