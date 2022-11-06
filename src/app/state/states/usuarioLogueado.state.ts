
import {Usuario} from '../../model/Usuario';
import {CursosService} from '../../services/cursos.service';
import {Injectable} from '@angular/core';
import {Curso} from '../../model/Curso';
import {Reseteable} from '../Reseteable';
import {Rol} from '../../model/rol';
import {tap} from "rxjs/operators";
import {Action, Selector, State, StateContext} from "@ngxs/store";

export class SetUsuarioLogueadoAction {
    static readonly type = '[UsuarioLogueado] Definir usuario';

    constructor(public usuario: Usuario) {
    }
}

@Reseteable
export class ResetUsuarioLogueado {
    static readonly type = '[UsuarioLogueado] Resetear usuario';

    constructor() {
    }
}

export class UsuarioLogueadoModel {
    public usuario: Usuario;
}

const usuarioLogueadoStateDefault: UsuarioLogueadoModel = {
    usuario: null,
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
    static getUsuarioLogueado(state: UsuarioLogueadoModel): Usuario {
        return state.usuario;
    }

    @Selector()
    static getRol(state: UsuarioLogueadoModel): Rol {
        return state.usuario.rol;
    }

    @Action(SetUsuarioLogueadoAction)
    setUsuarioLogueado(ctx: StateContext<UsuarioLogueadoModel>, action: SetUsuarioLogueadoAction) {
        ctx.patchState({ usuario: action.usuario });
    }


    @Action(ResetUsuarioLogueado)
    resetUsuarioLogueado(ctx: StateContext<UsuarioLogueadoModel>, action: ResetUsuarioLogueado) {
        ctx.setState(usuarioLogueadoStateDefault);
    }


}
