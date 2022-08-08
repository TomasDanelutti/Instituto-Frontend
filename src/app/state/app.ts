
import {UsuarioLogueadoModel, UsuarioLogueadoState} from './states/usuarioLogueado.state';
import {CursoModel, CursoState} from "./states/curso.state";
import {ProgramaModel, ProgramaState} from "./states/programa.state";
import {UsuarioModel, UsuarioState} from "./states/usuario.state";


export interface AppState {
    usuarioLogueadoStateModel: UsuarioLogueadoModel;
    usuarioStateModel: UsuarioModel;
    cursoStateModel: CursoModel;
    programaStateModel: ProgramaModel
}

export const states = [UsuarioLogueadoState, CursoState, ProgramaState, UsuarioState];
