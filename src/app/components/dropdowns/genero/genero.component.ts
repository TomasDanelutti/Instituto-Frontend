import { Component, OnInit } from '@angular/core';
import {EnumService} from '../../../services/enum.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GeneroComponent
    }
  ]
})
export class GeneroComponent implements OnInit, ControlValueAccessor{
  generos: object[] = [];
  generoSeleccionado: object;
  disabled = false;

  constructor(private enumService: EnumService) {
  }


  onChange = (genero) => {
  }
  onTouched = () => {
  }


  writeValue(obj: any): void {
    this.generoSeleccionado = obj;
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
    this.generos = this.enumService.getGenero();
  }


  onChangeGenero(event: any) {
    this.onChange(event.value);
  }
}
