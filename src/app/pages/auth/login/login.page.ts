import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {SetUsuarioLogueadoAction} from "../../../state/states/usuarioLogueado.state";
import {LoginService} from "../../../services/login.service";
import {MessagesService} from "../../../services/messages.service";

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
            this.router.navigate(['/home']);
            console.log(usuario);
            this.store.dispatch(new SetUsuarioLogueadoAction(usuario));
          }, error => this.messages.ventanaError('Error', 'usuario o clave incorrecto'));
    }
    else {
      this.messages.showMessage('Error', 'Usuario o contraseña incorrecto', 5000);
    }
    }

  ionViewDidLeave() {
    this.loginForm.reset();
  }

  registrarse() {
    this.router.navigate(['/registrar-alumno']);
  }

  recuperarClave() {
    this.router.navigate(['/olvideMiClave']);
  }
}
