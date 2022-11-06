import {Component, forwardRef, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MessagesService} from '../../services/messages.service';

@Component({
  selector: 'app-clave-input',
  templateUrl: './clave-input.component.html',
  styleUrls: ['./clave-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClaveInputComponent),
      multi: true // por si necesitamos agregar mas providers
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ClaveInputComponent),
      multi: true
    }
  ]
})

export class ClaveInputComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input()
  disabledInput: boolean;

  @Input()
  updateOn: string;

  @Input()
  labelClave: string;

  @Input()
  mostrarFeedback: boolean;

  mostrarPassword: boolean;
  passwordIcon: string;


  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  password: FormControl = new FormControl();

  constructor(private _MessagesService: MessagesService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabledInput) {
      if (this.disabledInput) {
        this.password.disable();
      } else {
        this.password.enable();
      }
    }
  }

  ngOnInit() {
    this.password = new FormControl('', { validators: [
        Validators.required,
        Validators.minLength(6)]});

    this.passwordIcon = 'pi pi-eye';

    this.password.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });
  }

  // trae el valor puesto en un ReactiveForm
  writeValue(value: any) {
    if (value) {
      this.password.setValue(value);
    } else {
      this.password.reset();
    }
  }

  // registramos una funcion que usamos para informarle a Angular el valor de nuestro FormControl
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // registramos una función que ejecutamos cuando necesitamos que nuestro FormControl tenga el estado “touched”
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    // Si no es blur, el formulario se valida con cada tecla que se presiona
    if (this.updateOn === "blur") {
      if (this.password.invalid && this.password.dirty) {

        if (this.password.errors.required) {
          this._MessagesService.showMessage('Atención', 'El campo clave es requerido', 5000);
          return { required: true };
        } else if (this.password.errors.minlength) {
          this._MessagesService.showMessage('Atención', 'La clave debe tener al menos seis caracteres', 5000);
          return { minlength: { requiredLength: 6, actualLength: this.password.value.length } };
        }
        return this.password.valid ? null : { password: { valid: false } };
      }
      return this.password.valid ? null : { errorDesconocido: true };
    }
  }

  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword;
    this.passwordIcon = this.mostrarPassword ? 'pi pi-eye-slash' : 'pi pi-eye';
  }
}

