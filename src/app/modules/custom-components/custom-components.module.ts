import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimeNgModule} from '../primeng/primeng.module';
import {CabeceraComponent} from '../../components/cabecera/cabecera.component';
import {MenuComponent} from '../../components/menu/menu.component';
import {TurnoComponent} from '../../components/dropdowns/turno/turno.component';
import {GeneroComponent} from '../../components/dropdowns/genero/genero.component';
import {ListaCursosInscriptosComponent
} from "../../components/tables/lista-cursos-inscriptos/lista-cursos-inscriptos.component";
import {DialogDocenteComponent} from "../../components/Dialogs/dialog-docente/dialog-docente.component";
import {DialogModule} from "primeng/dialog";
import {AvatarModule} from "primeng/avatar";
import {TablaListaCursosComponent} from "../../components/tables/tabla-lista-cursos/tabla-lista-cursos.component";
import {LoadingComponent} from "../../components/loading/loading.component";
import {InputNumberModule} from "primeng/inputnumber";
import {PuestoComponent} from "../../components/dropdowns/puesto/puesto.component";
import {TableComponent} from "../../components/tables/table/table.component";
import {ProfesorComponent} from "../../components/dropdowns/profesor/profesor.component";
import {AdministrativoComponent} from "../../components/dropdowns/administrativo/administrativo.component";
import {ModalidadComponent} from "../../components/dropdowns/modalidad/modalidad.component";
import {FechaComponent} from "../../components/calendarios/fecha/fecha.component";
import {DniComponent} from "../../components/dni/dni.component";
import {CelularComponent} from "../../components/celular/celular.component";
import {ClaveInputComponent} from "../../components/clave-input/clave-input.component";
import {EstadoCivilComponent} from "../../components/dropdowns/estado-civil/estado-civil.component";
import {NivelEducativoComponent} from "../../components/dropdowns/nivel-educativo/nivel-educativo.component";
import {VolverComponent} from "../../components/botones/volver/volver.component";
import {BadgeModule} from "primeng/badge";
import {
    DialogSolicitudesDesinscripcionComponent
} from "../../components/Dialogs/dialog-solicitudes-desinscripcion/dialog-solicitudes-desinscripcion.component";

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
        TableComponent,
        TablaListaCursosComponent,
        LoadingComponent,
        PuestoComponent,
        ProfesorComponent,
        AdministrativoComponent,
        ModalidadComponent,
        DniComponent,
        CelularComponent,
        ClaveInputComponent,
        EstadoCivilComponent,
        NivelEducativoComponent,
        VolverComponent,
        DialogSolicitudesDesinscripcionComponent
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
        BadgeModule,
    ],
    exports: [
        CabeceraComponent,
        MenuComponent,
        TurnoComponent,
        GeneroComponent,
        FechaComponent,
        ListaCursosInscriptosComponent,
        DialogDocenteComponent,
        TableComponent,
        TablaListaCursosComponent,
        LoadingComponent,
        PuestoComponent,
        ProfesorComponent,
        AdministrativoComponent,
        ModalidadComponent,
        DniComponent,
        CelularComponent,
        ClaveInputComponent,
        EstadoCivilComponent,
        NivelEducativoComponent,
        VolverComponent,
        DialogSolicitudesDesinscripcionComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CustomComponentsModule {
}
