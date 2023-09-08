import { Component } from '@angular/core';
import {Platform} from "@ionic/angular";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {MessagesService} from "./services/messages.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  constructor(
      private platform: Platform,
      private primengConfig: PrimeNGConfig,
      private messageServicePrime: MessageService,
      private messageServiceNuestro: MessagesService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.primengConfig.ripple = true;
    });
    this.messageServiceNuestro.configurarToast(this.messageServicePrime);
  }
}
