import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LazyLoadEvent} from "primeng/api";

@Component({
  selector: 'app-tabla-lista-cursos',
  templateUrl: './tabla-lista-cursos.component.html',
  styleUrls: ['./tabla-lista-cursos.component.scss'],
})
export class TablaListaCursosComponent {
  @Input() accionButton: boolean;
  @Input() inspectButton: boolean;
  @Input() imageButton: boolean;
  @Input() dataBackend: object[];         // Recibe los datos ya formateados para mostrarlos en la tabla
  @Input() cols: object[];                // Recibe en numero de objetos a mostrar por pagina
  @Input() totalRegistrosBackend: number; // Lo necesita para poder paginar
  @Input() cantidadElementos: number;     // Cantidad elementos a mostrar en cada página de la table
  @Input() paginator: boolean;            // Activa o desactiva el paginador

  @Output() inscribirseItem = new EventEmitter<number>();
  @Output() desinscribirseItem = new EventEmitter<number>();
  @Output() inspeccionarItem = new EventEmitter<number>();
  @Output() cargarData = new EventEmitter<number>();

  constructor() { }


  emitirParaInscribirse(idObject: any) {
    this.inscribirseItem.emit(idObject);
  }

  emitirParaDesinscribirse(idObject: any) {
    this.desinscribirseItem.emit(idObject);
  }

  emitirIdParaInspeccionar(idObject: any) {
    this.inspeccionarItem.emit(idObject);
  }

  loadData({first}: LazyLoadEvent) {
    // this.cargarData.emit(first / this.cantidadElementos); // Emito la pagina que debo cargar
  }
}
