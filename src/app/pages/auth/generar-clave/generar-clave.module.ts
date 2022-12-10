import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarClavePageRoutingModule } from './generar-clave-routing.module';

import { GenerarClavePage } from './generar-clave.page';
import {CustomComponentsModule} from "../../../modules/custom-components/custom-components.module";
import {PrimeNgModule} from "../../../modules/primeng/primeng.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GenerarClavePageRoutingModule,
        CustomComponentsModule,
        ReactiveFormsModule,
        PrimeNgModule
    ],
  declarations: [GenerarClavePage]
})
export class GenerarClavePageModule {}
