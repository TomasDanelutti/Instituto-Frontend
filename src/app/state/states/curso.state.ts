import {Curso} from "../../model/Curso";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Reseteable} from "../Reseteable";

export class SetCursoAction {
    static readonly type = '[Curso] Definir curso';

    constructor(public curso: Curso) {
    }
}

@Reseteable
export class ResetCurso {
    static readonly type = '[Curso] Resetear curso';

    constructor() {
    }
}

export class CursoModel {
    public curso: Curso;
}

const cursoStateDefault: CursoModel = {
    curso: null,
};

@State<CursoModel>({
    name: 'Curso',
    defaults: cursoStateDefault
})

@Injectable()
export class CursoState {

    @Selector()
    static getCurso(state: CursoModel): Curso {
        return state.curso;
    }

    @Action(SetCursoAction)
    setCurso(ctx: StateContext<CursoModel>, action: SetCursoAction) {
        ctx.patchState({ curso: action.curso });
    }

    @Action(ResetCurso)
    resetUsuario(ctx: StateContext<CursoModel>, action: ResetCurso) {
        ctx.setState(cursoStateDefault);
    }
}
