import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SetUsuarioLogueadoAction} from "./usuarioLogueado.state";
import {RespuestaAutenticacion} from "../../model/respuesta-autenticacion";

export class LoginAction {
  static readonly type = '[Auth] Login';

  constructor(public respuestaAutenticacion: RespuestaAutenticacion) {
  }
}

export class LogoutAction {
  static readonly type = '[Auth] Logout';

  constructor() {
  }
}

export class AuthStateModel {
  public respuestaAutenticacion: RespuestaAutenticacion;
  public token: string;
}

const LOGIN_STATE_TOKEN = new StateToken<AuthStateModel[]>('auth');

const authStateDefaults: AuthStateModel = {
  token: null,
  respuestaAutenticacion: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    access_token: null,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    token_type: null,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    expires_in: null,
    scope: null,
    jti: null
  }
};

@State<AuthStateModel>({
  name: LOGIN_STATE_TOKEN,
  defaults: authStateDefaults
})

@Injectable()
export class AuthState {

  constructor(
    private router: Router) {
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.respuestaAutenticacion.access_token;
  }

  @Selector()
  static token(state: AuthStateModel): string {
    return state.respuestaAutenticacion.access_token;
  }

  @Selector()
  static getToken(state: AuthStateModel): string {
    return state.token;
  }

  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    console.log('LoginAction');
    ctx.setState({...ctx.getState(), respuestaAutenticacion: action.respuestaAutenticacion});
    ctx.setState({...ctx.getState(), token: JSON.stringify(action.respuestaAutenticacion)});
    console.log(action.respuestaAutenticacion.access_token)
    ctx.dispatch(new SetUsuarioLogueadoAction());
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>, action: LogoutAction) {
    ctx.setState(authStateDefaults);
  }
}
