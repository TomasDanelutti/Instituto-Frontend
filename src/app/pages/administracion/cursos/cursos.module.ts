import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosPageRoutingModule } from './cursos-routing.module';

import { CursosPage } from './cursos.page';
import {CustomComponentsModule} from '../../../modules/custom-components/custom-components.module';
import {PrimeNgModule} from '../../../modules/primeng/primeng.module';
import {ToastModule} from "primeng/toast";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CursosPageRoutingModule,
        CustomComponentsModule,
        PrimeNgModule,
        ReactiveFormsModule,
        ToastModule,
    ],
  declarations: [CursosPage]
})
export class CursosPageModule {}
