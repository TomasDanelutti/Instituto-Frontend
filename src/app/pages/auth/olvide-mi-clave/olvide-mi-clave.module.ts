import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvideMiClavePageRoutingModule } from './olvide-mi-clave-routing.module';

import { OlvideMiClavePage } from './olvide-mi-clave.page';
import {CustomComponentsModule} from "../../../modules/custom-components/custom-components.module";
import {PrimeNgModule} from "../../../modules/primeng/primeng.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PrimeNgModule,
        OlvideMiClavePageRoutingModule,
        CustomComponentsModule,
        ReactiveFormsModule,
    ],
  declarations: [OlvideMiClavePage]
})
export class OlvideMiClavePageModule {}
