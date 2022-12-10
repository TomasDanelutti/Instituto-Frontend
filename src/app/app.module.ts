import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxsModule.forRoot(states),
    NgxsStoragePluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({disabled: true}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    CustomComponentsModule,
    HttpClientModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
