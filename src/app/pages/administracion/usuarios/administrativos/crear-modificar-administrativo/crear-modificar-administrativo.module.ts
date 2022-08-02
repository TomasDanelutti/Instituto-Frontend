import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearModificarAdministrativoPageRoutingModule } from './crear-modificar-administrativo-routing.module';

import { CrearModificarAdministrativoPage } from './crear-modificar-administrativo.page';
import {CustomComponentsModule} from '../../../../../modules/custom-components/custom-components.module';
import {PrimeNgModule} from '../../../../../modules/primeng/primeng.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrearModificarAdministrativoPageRoutingModule,
        CustomComponentsModule,
        PrimeNgModule,
        ReactiveFormsModule
    ],
  declarations: [CrearModificarAdministrativoPage]
})
export class CrearModificarAdministrativoPageModule {}
