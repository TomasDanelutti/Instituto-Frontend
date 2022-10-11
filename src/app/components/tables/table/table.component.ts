import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SweetAlertResult} from "sweetalert2";
import {LazyLoadEvent} from "primeng/api";
import {Table} from "primeng/table";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @ViewChild(Table)
  private table: Table;

  @Input() dataBackend: object[];         // Recibe los datos ya formateados para mostrarlos en la tabla
  @Input() cols: object[];                // Para poder acceder a cada propiedad y header correspondiente
  @Input() editButton: boolean;
  @Input() deleteButton: boolean;
  @Input() inspectButton: boolean;
  @Input() totalRegistrosBackend: number; // Lo necesita para poder paginar
  @Input() cantidadElementos: number;     // Cantidad elementos a mostrar en cada página de la table
  @Input() imageButton: boolean;
  @Input() paginator: boolean;


  @Output() editarItem = new EventEmitter<number>();
  @Output() borrarItem = new EventEmitter<number>();
  @Output() inspeccionarItem = new EventEmitter<number>();
  @Output() cargarData = new EventEmitter<number>();
  constructor(private messagesService: MessagesService) { }

  emitirIdParaEditar(idObject: any) {
    this.editarItem.emit(idObject);
  }

  emitirIdParaBorrar(idObject: any) {
    this.messagesService.ventanaConfirmar('Atención', `¿Desea eliminar el elemento seleccionado?`)
        .then((result: SweetAlertResult) => {
          if (result.isConfirmed) {
            this.borrarItem.emit(idObject);
          }
        });
  }

  emitirIdParaInspeccionar(idObject: any) {
    this.inspeccionarItem.emit(idObject);
  }

  loadData({first}: LazyLoadEvent) {
    this.cargarData.emit(first / this.cantidadElementos); // Emito la pagina que debo cargar
  }

}
