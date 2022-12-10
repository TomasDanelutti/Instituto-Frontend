import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {EnumService} from "../../../services/enum.service";

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  styleUrls: ['./estado-civil.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: EstadoCivilComponent
    }
  ]
})
export class EstadoCivilComponent implements OnInit, OnDestroy, ControlValueAccessor {
  estadosCiviles: object[] = [];
  estadoCivilSeleccionado: object;
  disabled = false;
  private subscriptions: Subscription[] = [];

  constructor(private enumService: EnumService) { }

  onChange = (estadoCivil) => {
  };
  onTouched = () => {
  };


  writeValue(obj: any): void {
    this.estadoCivilSeleccionado = obj;
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
    this.estadosCiviles = this.enumService.getEstadosCiviles();
  }

  onChangeEstadoCivil(event: any) {
    this.onChange(event.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}
