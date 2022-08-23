import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../../../../services/usuario.service';
import {Usuario} from '../../../../model/Usuario';

@Component({
  selector: 'app-administrativos',
  templateUrl: './administrativos.page.html',
  styleUrls: ['./administrativos.page.scss'],
})
export class AdministrativosPage implements OnInit {
  administrativos: Usuario[] = [];
    buscador: any;
  constructor(private router: Router,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.usuarioService.getAdministrativos().subscribe(value => this.administrativos = value);
  }

  crearAdministrativo() {
      this.router.navigate(['administrar/administrativos/crear-modificar-administrativo'], {replaceUrl: true});
  }

  buscar(buscador: any) {
    if (buscador) {
      this.usuarioService.getAdministrativoByNombre(buscador).subscribe(value => this.administrativos = value);
    }
    else {
      this.usuarioService.getAdministrativos().subscribe(value => this.administrativos = value);
    }
  }
}
