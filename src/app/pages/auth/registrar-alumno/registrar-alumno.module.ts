import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarAlumnoPageRoutingModule } from './registrar-alumno-routing.module';

import { RegistrarAlumnoPage } from './registrar-alumno.page';
import {PrimeNgModule} from '../../../modules/primeng/primeng.module';
import {CustomComponentsModule} from '../../../modules/custom-components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegistrarAlumnoPageRoutingModule,
        PrimeNgModule,
        CustomComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [RegistrarAlumnoPage]
})
export class RegistrarAlumnoPageModule {}
