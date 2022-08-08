import {Reseteable} from "../Reseteable";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Programa} from "../../model/Programa";

export class SetProgramaAction {
    static readonly type = '[Programa] Definir programa';

    constructor(public programa: Programa) {
    }
}

@Reseteable
export class ResetPrograma {
    static readonly type = '[Programa] Resetear programa';

    constructor() {
    }
}

export class ProgramaModel {
    public programa: Programa;
}

const programaStateDefault: ProgramaModel = {
    programa: null,
};

@State<ProgramaModel>({
    name: 'Programa',
    defaults: programaStateDefault
})

@Injectable()
export class ProgramaState {

    @Selector()
    static getCurso(state: ProgramaModel): Programa {
        return state.programa;
    }

    @Action(SetProgramaAction)
    setCurso(ctx: StateContext<ProgramaModel>, action: SetProgramaAction) {
        ctx.patchState({ programa: action.programa });
    }

    @Action(ResetPrograma)
    resetUsuario(ctx: StateContext<ProgramaModel>, action: ResetPrograma) {
        ctx.setState(programaStateDefault);
    }
}
