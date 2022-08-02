import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {Programa} from '../../model/Programa';
import {ProgramaService} from '../../services/programa.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProgramaComponent
    }
  ]
})
export class ProgramaComponent implements OnInit, ControlValueAccessor, OnDestroy {
  private subscriptions: Subscription[] = [];
  programas: Programa[] = [];
  programaSeleccionado: Programa;
  disabled = false;

  constructor(private programaService: ProgramaService) {
  }


  onChange = (area) => {
  }
  onTouched = () => {
  };


  writeValue(obj: any): void {
    this.programaSeleccionado = obj;
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
    this.subscriptions.push(this.programaService.getProgramas()
        .subscribe(value => this.programas = value));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  onChangeAreaEstudio(event: any) {
    this.onChange(event.value);
  }
}
