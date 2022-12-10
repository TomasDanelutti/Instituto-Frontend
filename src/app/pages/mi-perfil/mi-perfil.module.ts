import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiPerfilPageRoutingModule } from './mi-perfil-routing.module';

import { MiPerfilPage } from './mi-perfil.page';
import {CustomComponentsModule} from "../../modules/custom-components/custom-components.module";
import {PrimeNgModule} from "../../modules/primeng/primeng.module";
import {AvatarModule} from "primeng/avatar";
import {ImageModule} from "primeng/image";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MiPerfilPageRoutingModule,
        CustomComponentsModule,
        PrimeNgModule,
        ReactiveFormsModule,
        AvatarModule,
        ImageModule
    ],
  declarations: [MiPerfilPage]
})
export class MiPerfilPageModule {}
