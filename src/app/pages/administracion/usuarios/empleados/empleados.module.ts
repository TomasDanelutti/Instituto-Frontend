import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmpleadosPage } from './empleados.page';
import {PrimeNgModule} from '../../../../modules/primeng/primeng.module';
import {CustomComponentsModule} from '../../../../modules/custom-components/custom-components.module';
import {EmpleadosPageRoutingModule} from "./empleados-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EmpleadosPageRoutingModule,
        PrimeNgModule,
        CustomComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [EmpleadosPage]
})
export class EmpleadosPageModule {}
