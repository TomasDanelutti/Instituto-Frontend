import {Curso} from './Curso';
import {Persona} from "./Persona";

export class Inscripcion {
    idInscripcion: number;
    persona: Persona
    Curso: Curso;
    estado: string;
    activo: boolean;
}
