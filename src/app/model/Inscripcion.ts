import {Usuario} from './Usuario';
import {Curso} from './Curso';

export class Inscripcion {
    idInscripcion: number;
    Usuario: Usuario
    Curso: Curso;
    estado: string;
    activo: boolean;
}
