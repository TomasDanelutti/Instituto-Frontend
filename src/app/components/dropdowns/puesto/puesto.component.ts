import { Component, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {EnumService} from "../../../services/enum.service";

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PuestoComponent
    }
  ]
})
export class PuestoComponent implements OnInit, ControlValueAccessor {
  puestos: object[] = [];
  puestoSeleccionado: object;
  disabled = false;

  constructor(private enumService: EnumService) {
  }


  onChange = (puesto) => {
  }
  onTouched = () => {
  }


  writeValue(obj: any): void {
    this.puestoSeleccionado = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    this.puestos = this.enumService.getPuestos();
  }


  onChangePuesto(event: any) {
    this.onChange(event.value);
  }
}
