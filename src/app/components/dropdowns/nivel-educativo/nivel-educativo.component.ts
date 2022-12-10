import { Component, OnInit } from '@angular/core';
import {EnumService} from "../../../services/enum.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-nivel-educativo',
  templateUrl: './nivel-educativo.component.html',
  styleUrls: ['./nivel-educativo.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NivelEducativoComponent
    }
  ]
})
export class NivelEducativoComponent implements OnInit, ControlValueAccessor {
  nivelesEducativos: object[] = [];
  nivelEducativoSeleccionado: object;
  disabled = false;

  constructor(private enumService: EnumService) {
  }


  onChange = (nivelEstudio) => {
  }
  onTouched = () => {
  }


  writeValue(obj: any): void {
    this.nivelEducativoSeleccionado = obj;
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
    this.nivelesEducativos = this.enumService.getNivelesEducativos();
  }


  onChangeNvelEducativo(event: any) {
    this.onChange(event.value);
  }
}
