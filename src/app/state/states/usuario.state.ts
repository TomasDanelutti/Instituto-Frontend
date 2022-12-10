import {Reseteable} from "../Reseteable";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Usuario} from "../../model/Usuario";

export class SetUsuarioAction {
    static readonly type = '[Usuario] Definir usuario';

    constructor(public usuario: Usuario) {
    }
}

@Reseteable
export class ResetUsuario {
    static readonly type = '[Usuario] Resetear usuario';

    constructor() {
    }
}

export class UsuarioModel {
    public usuario: Usuario;
}

const usuarioStateDefault: UsuarioModel = {
    usuario: null,
};

@State<UsuarioModel>({
    name: 'Usuario',
    defaults: usuarioStateDefault
})

@Injectable()
export class UsuarioState {

    @Selector()
    static getUsuario(state: UsuarioModel): Usuario {
        return state.usuario;
    }

    @Action(SetUsuarioAction)
    setCurso(ctx: StateContext<UsuarioModel>, action: SetUsuarioAction) {
        ctx.patchState({ usuario: action.usuario });
    }

    @Action(ResetUsuario)
    resetUsuario(ctx: StateContext<UsuarioModel>, action: ResetUsuario) {
        ctx.setState(usuarioStateDefault);
    }
}
