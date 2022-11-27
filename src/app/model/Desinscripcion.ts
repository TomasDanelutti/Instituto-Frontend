import {Alumno} from "./Alumno";
import {Curso} from "./Curso";
import {Empleado} from "./Empleado";

export class Desinscripcion {
    idNotificacionDesinscripcion: number;
    alumno: Alumno;
    curso: Curso;
    empleado: Empleado;
    fechaCreacionDesinscripcion: Date;
    motivo: string;
    estado: boolean;
}
