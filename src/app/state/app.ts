
import {UsuarioLogueadoModel, UsuarioLogueadoState} from './usuarioLogueado.state';


export interface AppState {
    usuarioLogueadoState: UsuarioLogueadoModel;
}

export const states = [UsuarioLogueadoState];
