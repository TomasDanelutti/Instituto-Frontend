import {Reseteable} from "../Reseteable";
import {Desinscripcion} from "../../model/Desinscripcion";
import {State} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NotificacionDesinscripcionService} from "../../services/notificacion-desinscripcion.service";

export class SetNotificacionesDsinscripcionAction {
    static readonly type = '[Curso] Definir notificaciones-desinscripcion';

    constructor() {
    }
}

@Reseteable
export class ResetNotificacionesDsinscripcionAction {
    static readonly type = '[Curso] Resetear notificaciones-desinscripcion';

    constructor() {
    }
}

export class NotificacionesDesinscricionModel {
    notificacionesDesinscripcion: Desinscripcion[];
    cantNotificaciones: number;
}

const notificacionesDesinscricionStateDefault: NotificacionesDesinscricionModel = {
    notificacionesDesinscripcion: [],
    cantNotificaciones: null,
}

@State<NotificacionesDesinscricionModel>({
    name: 'NotificacionesDesinscricion',
    defaults: notificacionesDesinscricionStateDefault
})

@Injectable()
export class NotificacionesDesinscripcionState {

    constructor(notificacionesDesinscripcionService: NotificacionDesinscripcionService) {
    }

}
