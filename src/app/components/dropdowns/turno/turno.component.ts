import {Component, OnInit} from '@angular/core';
import {EnumService} from '../../../services/enum.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TurnoService} from '../../../services/turno.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TurnoComponent
    }
  ]
})
export class TurnoComponent implements OnInit, ControlValueAccessor{
  turnos: object[] = [];
  turnoSeleccionado: object;
  disabled = false;

  constructor(private turnoService: TurnoService, private enumService: EnumService) {
  }


  onChange = (area) => {
  }
  onTouched = () => {
  }


  writeValue(obj: any): void {
    this.turnoSeleccionado = obj;
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
    this.turnos = this.enumService.getTurnos();
  }


  onChangeTurno(event: any) {
    this.onChange(event.value);
  }
}
