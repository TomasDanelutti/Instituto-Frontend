import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {SetUsuarioLogueadoAction} from "../../../state/states/usuarioLogueado.state";
import {LoginService} from "../../../services/login.service";
import {MessagesService} from "../../../services/messages.service";
import {AuthService} from "../../../services/auth.service";
import {LoginAction} from "../../../state/states/auth.state";

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
      private authService: AuthService,
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
      this.authService.login(this.loginForm.controls.dni.value, this.loginForm.controls.clave.value).subscribe((data: any) => {
        console.log(data);
        this.store.dispatch(new LoginAction(data));
        this.router.navigate(['/home']);
      }, error => {this.messages.showMessage('Error', error.error.error_description, 5000); });
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
