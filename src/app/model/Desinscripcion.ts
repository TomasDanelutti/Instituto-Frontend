import {Alumno} from "./Alumno";
import {Curso} from "./Curso";
import {Empleado} from "./Empleado";

export class Desinscripcion {
    idNotificacionDesinscripcion: number;
    alumno: Alumno;
    Curso: Curso;
    empleado: Empleado;
    fechaCreacionNotificacion: Date;
    motivo: string;
    estado: boolean;
}
