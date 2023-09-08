import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {NgxsModule} from '@ngxs/store';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {states} from './state/app';
import {CustomComponentsModule} from "./modules/custom-components/custom-components.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppHttpInterceptor } from './app.httpInterceptor';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {MenuComponent} from "./components/menu/menu.component";
import {PrimeNgModule} from "./modules/primeng/primeng.module";
import {AvatarModule} from "primeng/avatar";
import {NgxsLogoutPluginModule} from "./state/logoutModule";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, MenuComponent],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        NgxsModule.forRoot(states),
        NgxsLogoutPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot({disabled: true}),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        CustomComponentsModule,
        HttpClientModule,
        ToastModule,
        PrimeNgModule,
        AvatarModule,
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      {provide: MessageService, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
