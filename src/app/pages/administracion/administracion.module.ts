import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosPageRoutingModule } from './administracion-routing.module';

import { AdministracionPage } from './administracion.page';
import {CustomComponentsModule} from '../../modules/custom-components/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosPageRoutingModule,
    CustomComponentsModule
  ],
  declarations: [AdministracionPage]
})
export class CursosPageModule {}
