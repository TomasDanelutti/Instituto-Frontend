import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {EmpleadoService} from "../../../services/empleado.service";
import {Empleado} from "../../../model/Empleado";

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProfesorComponent
    }
  ]
})
export class ProfesorComponent implements OnInit, ControlValueAccessor {
  profesores: Empleado[] = [];
  profesorSeleccionado: Empleado;
  disabled = false;

  constructor(private empleadoService: EmpleadoService) {
  }


  onChange = (profesor) => {
  }
  onTouched = () => {
  }


  writeValue(obj: any): void {
    this.profesorSeleccionado = obj;
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
    this.empleadoService.getEmpleadosByPuesto("Profesor")
        .subscribe(profesores => this.profesores = profesores);
  }

  onChangeProfesor(event: any) {
    this.onChange(event.value);
  }
}
