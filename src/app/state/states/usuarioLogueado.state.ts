
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

export class SetCursosInscriptos {
    static readonly type = '[UsuarioLogueado] buscar cursos del usuario';

    constructor(public idUsuario: number) {
    }
}

export class SetCursosNoInscriptos {
    static readonly type = '[UsuarioLogueado] buscar cursos a los cual el usuario no esta inscripto';

    constructor(public idUsuario: number) {
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
    public cursosInscriptos: Curso[];
    public cursosNoInscriptos: Curso[];
}

const usuarioLogueadoStateDefault: UsuarioLogueadoModel = {
    usuario: null,
    cursosInscriptos: [],
    cursosNoInscriptos: [],
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
    static getCursosInscriptos(state: UsuarioLogueadoModel): Curso[] {
        return state.cursosInscriptos;
    }

    @Selector()
    static getCursosNoInscriptos(state: UsuarioLogueadoModel): Curso[] {
        return state.cursosNoInscriptos
    }

    @Selector()
    static getRol(state: UsuarioLogueadoModel): Rol {
        return state.usuario.rol;
    }

    @Action(SetUsuarioLogueadoAction)
    setUsuarioLogueado(ctx: StateContext<UsuarioLogueadoModel>, action: SetUsuarioLogueadoAction) {
        ctx.patchState({ usuario: action.usuario });
    }

    @Action(SetCursosInscriptos)
    setCursosInscriptos(ctx: StateContext<UsuarioLogueadoModel>, action: SetCursosInscriptos) {
        return this.cursosService.getCursoInscriptosByUsuario(action.idUsuario).pipe(tap(value => {
            ctx.patchState({ cursosInscriptos: value });
        }))
    }

    @Action(SetCursosNoInscriptos)
    setCursosNpInscriptos(ctx: StateContext<UsuarioLogueadoModel>, action: SetCursosInscriptos) {
        return this.cursosService.getCursoNoInscriptosByUsuario(action.idUsuario).pipe(tap(value => {
            ctx.patchState({ cursosNoInscriptos: value });
        }))
    }

    @Action(ResetUsuarioLogueado)
    resetUsuarioLogueado(ctx: StateContext<UsuarioLogueadoModel>, action: ResetUsuarioLogueado) {
        ctx.setState(usuarioLogueadoStateDefault);
    }


}
