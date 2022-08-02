import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosPageRoutingModule } from './cursos-routing.module';

import { CursosPage } from './cursos.page';
import {CustomComponentsModule} from '../../../modules/custom-components/custom-components.module';
import {PrimeNgModule} from '../../../modules/primeng/primeng.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CursosPageRoutingModule,
        CustomComponentsModule,
        PrimeNgModule,
    ],
  declarations: [CursosPage]
})
export class CursosPageModule {}
