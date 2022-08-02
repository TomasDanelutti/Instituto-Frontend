import {Component, Input, OnInit, Output, OnChanges, EventEmitter, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.scss'],
})
export class FechaComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() fechaMax: boolean; // indica si hay un límite de fecha máximo
  @Input() fechaMin: boolean; // indica si hay un límite de fecha mínimo
  @Input() fechaPadre: Date; // se usa para cuando viene una fecha precargada desde el componente padre
  @Input() disabled: boolean;
  @Output() fechaSeleccionada = new EventEmitter<string>();

  fechaMaxima: Date;
  fechaMinima: Date;
  fecha: Date;

  es: any;

  constructor() {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.fechaPadre?.currentValue) {
      this.fecha = new Date(changes.fechaPadre.currentValue);
    } else {
      if (changes.label?.currentValue === 'Fecha *') {
        this.fecha = new Date();
        this.emitirFecha(this.fecha);
      } else {
        if (!(changes.fechaSeleccionada?.currentValue)) {
          this.fecha = null;
        }
      }
    }
  }


  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Borrar'
    };

    if (this.fechaMax) {
      this.fechaMaxima = new Date();
    } else if (this.fechaMin) {
      this.fechaMinima = new Date();
    }
  }

  // Método para convertir el valor del input type="date", de formato aaaa-mm-dd, al formato Date que soporta el backend
  toISOLocal(date: Date): string {
    let timeZoneOffset: number = date.getTimezoneOffset();
    const sign: string = timeZoneOffset < 0 ? '+' : '-';
    timeZoneOffset = Math.abs(timeZoneOffset);

    return date.getFullYear() + '-'
        + this.localTimeZone(date.getMonth() + 1) + '-' +
        this.localTimeZone(date.getUTCDate()) + 'T' +
        this.localTimeZone(date.getHours()) + ':' +
        this.localTimeZone(date.getMinutes()) + ':' +
        this.localTimeZone(date.getSeconds()) +
        sign + this.localTimeZone(timeZoneOffset / 60 | 0) + ':' + this.localTimeZone(timeZoneOffset % 60);
  }

  localTimeZone(n: number): string {
    // slice(-2) extrae los últimos 2 caracteres de un string. Sirve para horas/minutos/segundos/meses < 10
    return ('0' + n).slice(-2);
  }

  emitirFecha(fecha: Date) {
    this.fechaSeleccionada.emit(this.toISOLocal(fecha));
  }
}
