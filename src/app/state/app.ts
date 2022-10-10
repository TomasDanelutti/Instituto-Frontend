import {UsuarioLogueadoModel, UsuarioLogueadoState} from './states/usuarioLogueado.state';
import {CursoModel, CursoState} from "./states/curso.state";
import {UsuarioModel, UsuarioState} from "./states/usuario.state";


export interface AppState {
    usuarioLogueadoStateModel: UsuarioLogueadoModel;
    usuarioStateModel: UsuarioModel;
    cursoStateModel: CursoModel;
}

export const states = [UsuarioLogueadoState, CursoState, UsuarioState];
