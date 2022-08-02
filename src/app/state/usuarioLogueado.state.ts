import {Action, Selector, StateContext, State} from '@ngxs/store';
import {Usuario} from '../model/Usuario';
import {CursosService} from '../services/cursos.service';
import {Injectable} from '@angular/core';
import {Curso} from '../model/Curso';
import {Reseteable} from './Reseteable';
import {Rol} from '../model/rol';

export class SetUsuarioAction {
    static readonly type = '[Usuario] Definir usuario';

    constructor(public usuario: Usuario) {
    }
}

export class SetCursosInscriptos {
    static readonly type = '[Usuario] buscar cursos del usuario';

    constructor(public idUsuario: number) {
    }
}

export class SetCursosNoInscriptos {
    static readonly type = '[Usuario] buscar cursos a los cual el usuario no esta inscripto';

    constructor(public idUsuario: number) {
    }
}

@Reseteable
export class ResetUsuario {
    static readonly type = '[Usuario] Resetear usuario';

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
    name: 'Usuario',
    defaults: usuarioLogueadoStateDefault
})

@Injectable()
export class UsuarioLogueadoState {

    constructor(private cursosService: CursosService) {
    }


    @Selector()
    static getUsuario(state: UsuarioLogueadoModel): Usuario {
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

    @Action(SetUsuarioAction)
    setUsuario(ctx: StateContext<UsuarioLogueadoModel>, action: SetUsuarioAction) {
        ctx.patchState({ usuario: action.usuario });
    }

    @Action(SetCursosInscriptos)
    setCursosInscriptos(ctx: StateContext<UsuarioLogueadoModel>, action: SetCursosInscriptos) {
        this.cursosService.getCursoInscriptosByUsuario(action.idUsuario).subscribe(value => {
            console.log(value);
            ctx.patchState({ cursosInscriptos: value });
        });
    }

    @Action(SetCursosNoInscriptos)
    setCursosNpInscriptos(ctx: StateContext<UsuarioLogueadoModel>, action: SetCursosInscriptos) {
        this.cursosService.getCursoNoInscriptosByUsuario(action.idUsuario).subscribe(value => {
            ctx.patchState({ cursosNoInscriptos: value });
        });
    }

    @Action(ResetUsuario)
    resetUsuario(ctx: StateContext<UsuarioLogueadoModel>, action: SetUsuarioAction) {
        ctx.setState(usuarioLogueadoStateDefault);
    }


}
