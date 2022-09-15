import {Programa} from './Programa';
import {Turno} from "./turno";

export class Curso {
    idCurso: number;
    nombre: string;
    turno: Turno;
    programa: Programa;
    cupoMaximo: number;
    cupoMinimo: number;
    profesor: string;
    imagen: string;

}
