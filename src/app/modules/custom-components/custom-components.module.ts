import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimeNgModule} from '../primeng/primeng.module';
import {CabeceraComponent} from '../../components/cabecera/cabecera.component';
import {MenuComponent} from '../../components/menu/menu.component';
import {TablaCursosComponent} from '../../components/tabla-cursos/tabla-cursos.component';
import {TurnoComponent} from '../../components/turno/turno.component';
import {ProgramaComponent} from '../../components/programa/programa.component';
import {TablaUsuariosComponent} from '../../components/tabla-usuarios/tabla-usuarios.component';
import {GeneroComponent} from '../../components/genero/genero.component';
import {FechaComponent} from '../../components/fecha/fecha.component';
import {ClaveInputComponent} from '../../components/clave-input/clave-input.component';
import {
    ListaCursosInscriptosComponent
} from "../../components/lista-cursos-inscriptos/lista-cursos-inscriptos.component";

;
@NgModule({
    declarations: [
        TablaCursosComponent,
        CabeceraComponent,
        MenuComponent,
        TurnoComponent,
        ProgramaComponent,
        TablaCursosComponent,
        TablaUsuariosComponent,
        GeneroComponent,
        FechaComponent,
        ClaveInputComponent,
        ListaCursosInscriptosComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        PrimeNgModule,
    ],
    exports: [
        TablaCursosComponent,
        CabeceraComponent,
        MenuComponent,
        TurnoComponent,
        ProgramaComponent,
        TablaCursosComponent,
        TablaUsuariosComponent,
        GeneroComponent,
        FechaComponent,
        ClaveInputComponent,
        ListaCursosInscriptosComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CustomComponentsModule {
}
