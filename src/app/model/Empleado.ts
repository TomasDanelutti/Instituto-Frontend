import {Puesto} from "./Puesto";
import {Persona} from "./Persona";

export class Empleado extends Persona {
    sueldo: number;
    puesto: Puesto;

}
