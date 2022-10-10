import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearModificarEmpleadosPage } from './crear-modificar-empleados.page';
import {CustomComponentsModule} from '../../../../../modules/custom-components/custom-components.module';
import {PrimeNgModule} from '../../../../../modules/primeng/primeng.module';
import {CrearModificarEmpleadosPageRoutingModule} from "./crear-modificar-empleados-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrearModificarEmpleadosPageRoutingModule,
        CustomComponentsModule,
        PrimeNgModule,
        ReactiveFormsModule
    ],
  declarations: [CrearModificarEmpleadosPage]
})
export class CrearModificarEmpleadosPageModule {}
