import {Rol} from './rol';
import {Archivo} from "./Archivo";

export class Usuario {
  idUsuario: number;
  dni: number;
  nombre: string;
  apellido: string;
  domicilio: string;
  telefono: string;
  estadoCivil: string;
  nivelEducativo: string;
  email: string;
  genero: string;
  rol: Rol;
  fechaNacimiento: Date;
  imagen: Archivo;
  estado: string;
  activo: boolean;
}
