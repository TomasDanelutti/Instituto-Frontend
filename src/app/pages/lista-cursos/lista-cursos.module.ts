import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {CustomComponentsModule} from '../../modules/custom-components/custom-components.module';
import {PrimeNgModule} from '../../modules/primeng/primeng.module';
import {RatingModule} from 'primeng/rating';
import {ListaCursosPage} from "./lista-cursos.page";
import {ListaCursosRoutingModule} from "./lista-cursos-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListaCursosRoutingModule,
        CustomComponentsModule,
        PrimeNgModule,
        RatingModule
    ],
  declarations: [ListaCursosPage]
})
export class ListaCursosPageModule {}
