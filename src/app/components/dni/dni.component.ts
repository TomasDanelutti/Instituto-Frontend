import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DniComponent),
      multi: true
    },
  ]
})
export class DniComponent implements OnInit, ControlValueAccessor {

  @Input() labelDNI: string;
  @Input() disabled = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  dni: FormControl;

  constructor() { }

  ngOnInit() {
    this.dni = new FormControl('', [
      Validators.pattern('^[\\d]{1,2}[\\d]{3,3}[\\d]{3,3}$'),
      Validators.min(1000000),
      Validators.max(99999999),
    ]);

    if(this.disabled){
      this.dni.disable();
    } else {
      this.dni.enable();
    }

    this.dni.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });
  }

  disableDniForm() {
    this.dni.disable();
  }

  validate(_: FormControl) {
    let result = true;
    result = this.dni.valid && this.dni.value;
    return result ? null : { dni: { valid: false } };
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any) {
    if (value) {
      this.dni.setValue(value);
    } else {
      this.dni.reset();
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
