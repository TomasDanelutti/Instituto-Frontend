import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { CustomComponentsModule } from 'src/app/modules/custom-components/custom-components.module';
import {PrimeNgModule} from '../../modules/primeng/primeng.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        CustomComponentsModule,
        PrimeNgModule,
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
