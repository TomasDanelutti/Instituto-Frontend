import {Injectable} from '@angular/core';
import {Turno} from '../model/turno';
import {Genero} from '../model/genero';
import {Puesto} from "../model/Puesto";
import {Modalidad} from "../model/Modalidad";

@Injectable({
    providedIn: 'root'
})
export class EnumService {
    turnos: object[] = [];
    generos: object[] = [];
    puestos: object[] = [];
    modalidades: object[] = [];

    constructor() {
        this.inicializarEnums();
    }

    inicializarEnums() {
        Turno.values().forEach(value => {
            this.turnos.push({label: value, value});
        });
        Genero.values().forEach(value => {
            this.generos.push({label: value, value});
        });
        Puesto.values().forEach(value => {
            this.puestos.push({label: value, value});
        })
        Modalidad.values().forEach(value => {
            this.modalidades.push({label: value, value});
        })
    }

    getTurnos(): object[] {
        return this.turnos;
    }
    getGenero(): object[] {
        return this.generos;
    }
    getPuestos(): object[] {
        return this.puestos;
    }
    getModalidades(): object[] {
        return this.modalidades;
    }
}
