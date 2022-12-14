import {Injectable, Injector} from '@angular/core';
import {getActionTypeFromInstance, NgxsNextPluginFn, NgxsPlugin, Store} from '@ngxs/store';
import {accionesReseteables} from './Reseteable';
import {ResetUsuarioLogueado} from "./states/usuarioLogueado.state";

@Injectable()
export class LogoutPlugin implements NgxsPlugin {

    constructor(private injector: Injector) {
    }

    handle(state: any, action: any, next: NgxsNextPluginFn): any {
        const store = this.injector.get<Store>(Store);

        if (getActionTypeFromInstance(action) === ResetUsuarioLogueado.type) {
            store.dispatch(accionesReseteables);
        }

        return next(state, action);
    }
}
