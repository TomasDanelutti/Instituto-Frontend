import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearModificarCursoPageRoutingModule } from './crear-modificar-curso-routing.module';

import { CrearModificarCursoPage } from './crear-modificar-curso.page';
import {PrimeNgModule} from '../../../../modules/primeng/primeng.module';
import {CustomComponentsModule} from '../../../../modules/custom-components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrearModificarCursoPageRoutingModule,
        PrimeNgModule,
        CustomComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [CrearModificarCursoPage]
})
export class CrearModificarCursoPageModule {}
