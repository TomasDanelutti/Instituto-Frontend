import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramasPageRoutingModule } from './programas-routing.module';

import { ProgramasPage } from './programas.page';
import {PrimeNgModule} from '../../../modules/primeng/primeng.module';
import {CustomComponentsModule} from '../../../modules/custom-components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProgramasPageRoutingModule,
        PrimeNgModule,
        CustomComponentsModule
    ],
  declarations: [ProgramasPage]
})
export class ProgramasPageModule {}
