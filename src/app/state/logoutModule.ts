import {ModuleWithProviders, NgModule} from '@angular/core';
import {NGXS_PLUGINS} from '@ngxs/store';
import {LogoutPlugin} from './logoutPlugin';

@NgModule()
export class NgxsLogoutPluginModule {
    static forRoot(config?: any): ModuleWithProviders<NgxsLogoutPluginModule> {
        return {
            ngModule: NgxsLogoutPluginModule,
            providers: [
                {
                    provide: NGXS_PLUGINS,
                    useClass: LogoutPlugin,
                    multi: true
                }
            ]
        };
    }
}
