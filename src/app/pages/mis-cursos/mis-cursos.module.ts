import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisCursosPageRoutingModule } from './mis-cursos-routing.module';

import { MisCursosPage } from './mis-cursos.page';
import {CustomComponentsModule} from "../../modules/custom-components/custom-components.module";
import {PrimeNgModule} from "../../modules/primeng/primeng.module";
import {ToastModule} from "primeng/toast";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MisCursosPageRoutingModule,
        CustomComponentsModule,
        PrimeNgModule,
        ToastModule
    ],
  declarations: [MisCursosPage]
})
export class MisCursosPageModule {}
