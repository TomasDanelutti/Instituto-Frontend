import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearModificarProgramaPageRoutingModule } from './crear-modificar-programa-routing.module';

import { CrearModificarProgramaPage } from './crear-modificar-programa.page';
import {PrimeNgModule} from '../../../../modules/primeng/primeng.module';
import {CustomComponentsModule} from '../../../../modules/custom-components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrearModificarProgramaPageRoutingModule,
        PrimeNgModule,
        CustomComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [CrearModificarProgramaPage]
})
export class CrearModificarProgramaPageModule {}
