import { Component } from '@angular/core';
import {Location} from "@angular/common";
@Component({
  selector: 'app-volver',
  templateUrl: './volver.component.html',
  styleUrls: ['./volver.component.scss'],
})
export class VolverComponent {

  constructor(private location: Location) { }

    volver() {
        this.location.back()
    }
}
