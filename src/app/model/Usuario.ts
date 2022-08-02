import {Rol} from './rol';

export class Usuario {
  idUsuario: number;
  dni: number;
  clave: string;
  nombre: string;
  apellido: string;
  domicilio: string;
  telefono: string;
  email: string;
  genero: string;
  rol: Rol;
}
