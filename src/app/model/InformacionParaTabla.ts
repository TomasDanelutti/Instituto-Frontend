/**
 * Representa los datos necesarios para mostrar informacion en una tabla.
 * Cantidad Elementos sería el número total de elementos a paginar
 * Elementos sería el arreglo con los datos a mostrar
 */
export class InformacionParaTabla<T> {
    cantidadElementos: number;
    elementos: T[];

    constructor(cantidadElementos: number, elementos: T[]) {
        this.cantidadElementos = cantidadElementos;
        this.elementos = elementos;
    }
}
