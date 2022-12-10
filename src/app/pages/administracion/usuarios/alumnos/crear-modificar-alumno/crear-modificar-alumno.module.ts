import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearModificarAlumnoPageRoutingModule } from './crear-modificar-alumno-routing.module';

import { CrearModificarAlumnoPage } from './crear-modificar-alumno.page';
import {PrimeNgModule} from '../../../../../modules/primeng/primeng.module';
import {CustomComponentsModule} from '../../../../../modules/custom-components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrearModificarAlumnoPageRoutingModule,
        PrimeNgModule,
        CustomComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [CrearModificarAlumnoPage]
})
export class CrearModificarAlumnoPageModule {}
