import {Reseteable} from "../Reseteable";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {DesinscripcionService} from "../../services/desinscripcion.service";
import {tap} from "rxjs/operators";
import {Usuario} from "../../model/Usuario";
import {UsuarioModel} from "./usuario.state";

export class SetCantDesinscripcionesAction {
    static readonly type = '[Desinscripcion] Contar desinscripciones';

    constructor() {
    }
}

@Reseteable
export class ResetDesinscripcionesAction {
    static readonly type = '[Desinscripcion] Resetear desinscripcion';

    constructor() {
    }
}

export class DesinscricionesModel {
    cantDesinscripciones: number;
}

const desinscricionStateDefault: DesinscricionesModel = {
    cantDesinscripciones: null,
}

@State<DesinscricionesModel>({
    name: 'Desinscricion',
    defaults: desinscricionStateDefault
})

@Injectable()
export class DesinscripcionState {

    constructor(private desinscripcionService: DesinscripcionService) {
    }

    static countDesinscripcionesActivas(state: DesinscricionesModel): number {
        return state.cantDesinscripciones;
    }

    @Selector()
    static getCantDesinscripciones(state: DesinscricionesModel): number {
        return state.cantDesinscripciones;
    }

    @Action(SetCantDesinscripcionesAction)
    setCantDesinscripciones(ctx: StateContext<DesinscricionesModel>, action: SetCantDesinscripcionesAction) {
        return this.desinscripcionService.contarDesinscripciones().pipe(
            tap(cantDesinscripcionesBackend => {
                ctx.patchState({ cantDesinscripciones: cantDesinscripcionesBackend });
            })
        );
    }

    @Action(ResetDesinscripcionesAction)
    resetUsuario(ctx: StateContext<DesinscricionesModel>, action: ResetDesinscripcionesAction) {
        ctx.setState(desinscricionStateDefault);
    }

}
