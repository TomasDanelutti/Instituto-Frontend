import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrativosPageRoutingModule } from './administrativos-routing.module';

import { AdministrativosPage } from './administrativos.page';
import {PrimeNgModule} from '../../../../modules/primeng/primeng.module';
import {CustomComponentsModule} from '../../../../modules/custom-components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdministrativosPageRoutingModule,
        PrimeNgModule,
        CustomComponentsModule
    ],
  declarations: [AdministrativosPage]
})
export class AdministrativosPageModule {}
