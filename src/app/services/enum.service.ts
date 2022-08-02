import {Injectable} from '@angular/core';
import {Turno} from '../model/turno';
import {Genero} from '../model/genero';

@Injectable({
    providedIn: 'root'
})
export class EnumService {
    turnos: object[] = [];
    generos: object[] = [];

    constructor() {
        this.inicializarEnums();
    }

    inicializarEnums() {
        Turno.values().forEach(value => {
            this.turnos.push({label: value, value});
        });
        Genero.values().forEach(value => {
            console.log(value)
            this.generos.push({label: value, value});
        });
    }

    getTurnos(): object[] {
        return this.turnos;
    }
    getGenero(): object[] {
        return this.generos;
    }

}
