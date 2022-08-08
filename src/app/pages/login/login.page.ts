import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessagesService} from '../../services/messages.service';
import {LoginService} from '../../services/login.service';
import {Store} from '@ngxs/store';
import {SetCursosInscriptos, SetCursosNoInscriptos, SetUsuarioLogueadoAction} from '../../state/states/usuarioLogueado.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  pwdInputType: string;
  hide = true;
  loginForm: FormGroup;
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private messages: MessagesService,
      private loginService: LoginService,
      private store: Store
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      dni: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.pwdInputType = this.hide ? 'password' : 'text';
  }


  pwdVisibility() {
    this.hide = !this.hide;
    this.pwdInputType = this.hide ? 'password' : 'text';
  }

    login() {
    if (this.loginForm.valid){
      this.loginService.login(this.loginForm.controls.dni.value, this.loginForm.controls.clave.value)
          .subscribe(usuario => {
            this.router.navigate(['/home'], {replaceUrl: true});
            this.store.dispatch(new SetUsuarioLogueadoAction(usuario));
            this.store.dispatch(new SetCursosInscriptos(usuario.idUsuario));
            this.store.dispatch(new SetCursosNoInscriptos(usuario.idUsuario));
          }, error => this.messages.showAlert('Error', 'usuario o clave incorrecto', 3));
    }
    else {
      this.messages.showMessage('Error', 'Usuario o contraseña incorrecto', 5000);
    }
    }

  ionViewDidLeave() {
    this.loginForm.reset();
  }

}
