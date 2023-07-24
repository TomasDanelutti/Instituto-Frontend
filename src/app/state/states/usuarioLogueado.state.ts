import {CursosService} from '../../services/cursos.service';
import {Injectable} from '@angular/core';
import {Reseteable} from '../Reseteable';
import {Rol} from '../../model/rol';
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {SetCantDesinscripcionesAction} from "./desinscripcion.state";
import {Persona} from "../../model/Persona";

export class SetUsuarioLogueadoAction {
    static readonly type = '[UsuarioLogueado] Definir usuario';

    constructor(public persona: Persona) {
    }
}

@Reseteable
export class ResetUsuarioLogueado {
    static readonly type = '[UsuarioLogueado] Resetear usuario';

    constructor() {
    }
}

export class UsuarioLogueadoModel {
    public persona: Persona;
}

const usuarioLogueadoStateDefault: UsuarioLogueadoModel = {
    persona: null,
};

@State<UsuarioLogueadoModel>({
    name: 'UsuarioLogueado',
    defaults: usuarioLogueadoStateDefault
})

@Injectable()
export class UsuarioLogueadoState {

    constructor(private cursosService: CursosService) {
    }


    @Selector()
    static getUsuarioLogueado(state: UsuarioLogueadoModel): Persona {
        return state.persona;
    }

    @Selector()
    static getRol(state: UsuarioLogueadoModel): Rol {
        return state.persona.rol;
    }

    @Action(SetUsuarioLogueadoAction)
    setUsuarioLogueado(ctx: StateContext<UsuarioLogueadoModel>, action: SetUsuarioLogueadoAction) {
        ctx.patchState({ persona: action.persona });
        ctx.dispatch(new SetCantDesinscripcionesAction());
    }


    @Action(ResetUsuarioLogueado)
    resetUsuarioLogueado(ctx: StateContext<UsuarioLogueadoModel>, action: ResetUsuarioLogueado) {
        ctx.setState(usuarioLogueadoStateDefault);
    }


}
