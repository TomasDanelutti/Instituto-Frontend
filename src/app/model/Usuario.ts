import {Rol} from './rol';
import {Archivo} from "./Archivo";

export class Usuario {
  idUsuario: number;
  dni: number;
  nombre: string;
  apellido: string;
  domicilio: string;
  telefono: string;
  email: string;
  genero: string;
  rol: Rol;
  fechaNacimiento: Date;
  imagen: Archivo;
}
