import {Usuario} from "./Usuario";
import {Puesto} from "./Puesto";

export class Empleado extends Usuario {
    sueldo: number;
    puesto: Puesto;

}
