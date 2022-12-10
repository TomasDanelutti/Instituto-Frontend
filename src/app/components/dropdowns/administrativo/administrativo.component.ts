import { Component, OnInit } from '@angular/core';
import {Empleado} from "../../../model/Empleado";
import {EmpleadoService} from "../../../services/empleado.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  styleUrls: ['./administrativo.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AdministrativoComponent
    }
  ]
})
export class AdministrativoComponent implements OnInit, ControlValueAccessor{
  administrativos: Empleado[] = [];
  administrativoSeleccionado: Empleado;
  disabled = false;
  nombre: string;

  constructor(private empleadoService: EmpleadoService) {
  }


  onChange = (administrativo) => {
  }
  onTouched = () => {
  }


  writeValue(obj: any): void {
    this.administrativoSeleccionado = obj;
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
    this.empleadoService.getEmpleadosByPuesto("Administrativo")
        .subscribe(administrativos => this.administrativos = administrativos);
  }

  onChangeAdministrativo(event: any) {
    this.onChange(event.value);
  }
}
