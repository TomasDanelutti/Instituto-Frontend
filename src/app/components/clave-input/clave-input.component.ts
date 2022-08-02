import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MessagesService } from '../../services/messages.service';

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

export class ClaveInputComponent implements OnInit, ControlValueAccessor {

  @Input()
  disableClave: Observable<boolean>;

  @Input()
  updateOn: string;

  @Input()
  labelClave: string;

  @Input() mostrarPassword: boolean;
  mostrarFeedback: boolean;

  passwordIcon: string;

  disableClaveSubscription: Subscription;

  onChange: any = () => { };
  onTouched: any = () => { };

  password: FormControl;

  constructor(private _MessagesService: MessagesService) { }

  ngOnInit() {

    this.setFormControls(this.updateOn);
    this.passwordIcon = 'pi pi-eye';

    this.password.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });

    if (this.disableClave) {
      // El componente padre avisa al input si debe habilitarse o no.
      this.disableClaveSubscription = this.disableClave.subscribe((deshabilitar: boolean) => {
        if (deshabilitar) {
          // Deshabilito input
          this.passwordIcon = 'pi pi-eye';
          this.mostrarPassword = false;
          this.password.disable();
        } else {
          // Habilito input
          this.password.enable();
        }
      });
    }
  }

  setFormControls(updateOn: string) {
    if (updateOn === "blur") {
      this.password = new FormControl('',
        { validators: [Validators.required, Validators.minLength(6)], updateOn: "blur" });
    } else {
      this.password = new FormControl('',
        { validators: [Validators.required, Validators.minLength(6)], updateOn: "change" });
    }
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

