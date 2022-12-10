import {Component, OnInit, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms';

@Component({
  selector: 'app-celular',
  templateUrl: './celular.component.html',
  styleUrls: ['./celular.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CelularComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CelularComponent),
      multi: true
    }
  ]
})
export class CelularComponent implements OnChanges, OnInit, ControlValueAccessor {
@Input() disable: boolean;
  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  celular: FormControl = new FormControl();

  constructor()
  {
  }
  ngOnChanges(changes: SimpleChanges): void {
        if (changes.disable) {
          if (this.disable) {
            this.celular.disable();
          } else {
            this.celular.enable();
          }
        }
    }

  ngOnInit() {
    this.celular = new FormControl('', { validators: [
          Validators.required,
          Validators.min(1000000000),
          Validators.max(9999999999)]});

    this.celular.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });

  }

  writeValue(value: any): void {
    if (value) {
      this.celular.setValue(value);
    } else {
      this.celular.reset();
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(v: FormControl) {
    let result = true;
    result = this.celular.valid && this.celular.value;
    return result ? null : { dni: { valid: false } };
  }

}
