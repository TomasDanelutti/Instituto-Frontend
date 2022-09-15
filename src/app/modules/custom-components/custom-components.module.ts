import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimeNgModule} from '../primeng/primeng.module';
import {CabeceraComponent} from '../../components/cabecera/cabecera.component';
import {MenuComponent} from '../../components/menu/menu.component';
import {TurnoComponent} from '../../components/turno/turno.component';
import {ProgramaComponent} from '../../components/programa/programa.component';
import {TablaUsuariosComponent} from '../../components/tabla-usuarios/tabla-usuarios.component';
import {GeneroComponent} from '../../components/genero/genero.component';
import {FechaComponent} from '../../components/fecha/fecha.component';
import {ClaveInputComponent} from '../../components/clave-input/clave-input.component';
import {
    ListaCursosInscriptosComponent
} from "../../components/lista-cursos-inscriptos/lista-cursos-inscriptos.component";
import {DialogDocenteComponent} from "../../components/Dialogs/dialog-docente/dialog-docente.component";
import {DialogModule} from "primeng/dialog";
import {AvatarModule} from "primeng/avatar";
import {TablaAbmsComponent} from "../../components/tabla-abms/tabla-abms.component";
import {TablaListaCursosComponent} from "../../components/tabla-lista-cursos/tabla-lista-cursos.component";

;
@NgModule({
    declarations: [
        CabeceraComponent,
        MenuComponent,
        TurnoComponent,
        ProgramaComponent,
        TablaUsuariosComponent,
        GeneroComponent,
        FechaComponent,
        ClaveInputComponent,
        ListaCursosInscriptosComponent,
        DialogDocenteComponent,
        TablaAbmsComponent,
        TablaListaCursosComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        PrimeNgModule,
        DialogModule,
        AvatarModule,
    ],
    exports: [
        CabeceraComponent,
        MenuComponent,
        TurnoComponent,
        ProgramaComponent,
        TablaUsuariosComponent,
        GeneroComponent,
        FechaComponent,
        ClaveInputComponent,
        ListaCursosInscriptosComponent,
        DialogDocenteComponent,
        TablaAbmsComponent,
        TablaListaCursosComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CustomComponentsModule {
}
