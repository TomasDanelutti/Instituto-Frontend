import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnosPageRoutingModule } from './alumnos-routing.module';

import { AlumnosPage } from './alumnos.page';
import {PrimeNgModule} from '../../../../modules/primeng/primeng.module';
import {CustomComponentsModule} from '../../../../modules/custom-components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AlumnosPageRoutingModule,
        PrimeNgModule,
        CustomComponentsModule
    ],
  declarations: [AlumnosPage]
})
export class AlumnosPageModule {}
