import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimeNgModule} from '../primeng/primeng.module';
import {CabeceraComponent} from '../../components/cabecera/cabecera.component';
import {MenuComponent} from '../../components/menu/menu.component';
import {TurnoComponent} from '../../components/dropdowns/turno/turno.component';
import {GeneroComponent} from '../../components/dropdowns/genero/genero.component';
import {FechaComponent} from '../../components/fecha/fecha.component';
import {ListaCursosInscriptosComponent
} from "../../components/tables/lista-cursos-inscriptos/lista-cursos-inscriptos.component";
import {DialogDocenteComponent} from "../../components/Dialogs/dialog-docente/dialog-docente.component";
import {DialogModule} from "primeng/dialog";
import {AvatarModule} from "primeng/avatar";
import {TablaAbmsComponent} from "../../components/tables/tabla-abms/tabla-abms.component";
import {TablaListaCursosComponent} from "../../components/tables/tabla-lista-cursos/tabla-lista-cursos.component";
import {LoadingComponent} from "../../components/loading/loading.component";
import {InputNumberModule} from "primeng/inputnumber";

;
@NgModule({
    declarations: [
        CabeceraComponent,
        MenuComponent,
        TurnoComponent,
        GeneroComponent,
        FechaComponent,
        ListaCursosInscriptosComponent,
        DialogDocenteComponent,
        TablaAbmsComponent,
        TablaListaCursosComponent,
        LoadingComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        PrimeNgModule,
        DialogModule,
        AvatarModule,
        InputNumberModule,
    ],
    exports: [
        CabeceraComponent,
        MenuComponent,
        TurnoComponent,
        GeneroComponent,
        FechaComponent,
        ListaCursosInscriptosComponent,
        DialogDocenteComponent,
        TablaAbmsComponent,
        TablaListaCursosComponent,
        LoadingComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CustomComponentsModule {
}
