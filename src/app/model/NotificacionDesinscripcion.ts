import {Alumno} from "./Alumno";
import {Curso} from "./Curso";
import {Empleado} from "./Empleado";

export class NotificacionDesinscripcion {
    idNotificacionDesinscripcion: number;
    alumno: Alumno;
    Curso: Curso;
    empleado: Empleado;
    motivo: string;
    estado: boolean;
}
