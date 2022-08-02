import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {CustomComponentsModule} from '../../modules/custom-components/custom-components.module';
import {PrimeNgModule} from '../../modules/primeng/primeng.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PrimeNgModule,
        CustomComponentsModule,
        LoginPageRoutingModule,
        ReactiveFormsModule,
        ToggleButtonModule,
        CardModule,
        InputTextModule
    ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
