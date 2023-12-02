import {UsuarioLogueadoModel, UsuarioLogueadoState} from './states/usuarioLogueado.state';
import {CursoModel, CursoState} from "./states/curso.state";
import {UsuarioModel, UsuarioState} from "./states/usuario.state";
import {DesinscricionesModel, DesinscripcionState} from "./states/desinscripcion.state";
import {AuthState, AuthStateModel} from "./states/auth.state";


export interface AppState {
    usuarioLogueadoStateModel: UsuarioLogueadoModel;
    usuarioStateModel: UsuarioModel;
    cursoStateModel: CursoModel;
    desinscripcionStateMode: DesinscricionesModel;
    authStateModel: AuthStateModel
}

export const states = [UsuarioLogueadoState, CursoState, UsuarioState, DesinscripcionState, AuthState];
