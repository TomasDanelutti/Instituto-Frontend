import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProgramaService} from '../../../../services/programa.service';
import {Programa} from '../../../../model/Programa';
import {MessagesService} from '../../../../services/messages.service';

@Component({
  selector: 'app-crear-modificar-programa',
  templateUrl: './crear-modificar-programa.page.html',
  styleUrls: ['./crear-modificar-programa.page.scss'],
})
export class CrearModificarProgramaPage implements OnInit {
  formulario: FormGroup;
  programa: Programa;
    titulo: string;
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private porgramaService: ProgramaService,
      private messagesService: MessagesService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      idPrograma: [],
      nombre: [Validators.required],
      descripcion: [Validators.required],
    });
  }

 async ionViewWillEnter() {
    // this.programa = (await this.storage.get('programa')) || new Programa() && this.formulario.reset();
    if (this.programa) {
        this.formulario.patchValue(this.programa);
    }
  }

    volver() {
      this.router.navigate(['/administrar/programas'], {replaceUrl: true});
    }

  guardarPrograma() {
      if (this.formulario.valid) {
          this.porgramaService.guardarPrograma(this.formulario.value).subscribe(rta => {
              this.messagesService.showMessage('Exito', 'Programa guardado correctamente', 5000);
              this.router.navigate(['/administrar/programas'], {replaceUrl: true});
          }, error => {
              this.messagesService.showMessage('Atención', 'No se pudo guardar el programa', 5000);
          });
      } else {
          this.messagesService.showMessage('Atención', 'formulario invalido', 5000);
      }
  }

    ionViewDidLeave() {
        this.formulario.reset();
        // this.storage.remove('programa');
    }
}
