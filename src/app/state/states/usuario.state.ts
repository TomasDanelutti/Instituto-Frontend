import {Reseteable} from "../Reseteable";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Persona} from "../../model/Persona";

export class SetUsuarioAction {
    static readonly type = '[Usuario] Definir usuario';

    constructor(public persona: Persona) {
    }
}

@Reseteable
export class ResetUsuario {
    static readonly type = '[Usuario] Resetear usuario';

    constructor() {
    }
}

export class UsuarioModel {
    public persona: Persona;
}

const usuarioStateDefault: UsuarioModel = {
    persona: null,
};

@State<UsuarioModel>({
    name: 'Usuario',
    defaults: usuarioStateDefault
})

@Injectable()
export class UsuarioState {

    @Selector()
    static getUsuario(state: UsuarioModel): Persona {
        return state.persona;
    }

    @Action(SetUsuarioAction)
    setCurso(ctx: StateContext<UsuarioModel>, action: SetUsuarioAction) {
        ctx.patchState({ persona: action.persona });
    }

    @Action(ResetUsuario)
    resetUsuario(ctx: StateContext<UsuarioModel>, action: ResetUsuario) {
        ctx.setState(usuarioStateDefault);
    }
}
