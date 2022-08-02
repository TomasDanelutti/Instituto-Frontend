
import {Programa} from './Programa';
import {Turno} from './turno';

export class Curso {
    idUCurso: number;
    nombre: string;
    turno: string;
    programa: Programa;
    cupoMaximo: number;
    cupoMinimo: number;
    profesor: string;
    imagen: string;

}
