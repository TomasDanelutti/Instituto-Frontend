import {Turno} from "./turno";
import {Archivo} from "./Archivo";

export class Curso {
    idCurso: number;
    nombre: string;
    turno: Turno;
    programa: Archivo;
    cupoMaximo: number;
    cupoMinimo: number;
    profesor: string;
    imagen: Archivo;

}
