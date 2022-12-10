import {Turno} from "./turno";
import {Archivo} from "./Archivo";
import {Empleado} from "./Empleado";

export class Curso {
    idCurso: number;
    nombre: string;
    turno: Turno;
    programa: Archivo;
    modalidad: string;
    aula: string;
    fechaInicio: Date;
    fechaFinalizacion: Date;
    horario: String
    cupoMaximo: number;
    cupoMinimo: number;
    profesor: Empleado;
    imagen: Archivo;
    estado: string;
    activo: boolean;

}
