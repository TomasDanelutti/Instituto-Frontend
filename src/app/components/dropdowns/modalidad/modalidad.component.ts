import { Component, OnInit } from '@angular/core';
import {EnumService} from "../../../services/enum.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-modalidad',
  templateUrl: './modalidad.component.html',
  styleUrls: ['./modalidad.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ModalidadComponent
    }
  ]
})
export class ModalidadComponent implements OnInit, ControlValueAccessor {
  modalidades: object[] = [];
  modalidadSeleccionada: object;
  disabled = false;

  constructor(private enumService: EnumService) {
  }


  onChange = (modalidad) => {
  }
  onTouched = () => {
  }


  writeValue(obj: any): void {
    this.modalidadSeleccionada = obj;
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
    this.modalidades = this.enumService.getModalidades();
  }


  onChangeModalidad(event: any) {
    this.onChange(event.value);
  }
}
