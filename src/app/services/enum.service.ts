import {Injectable} from '@angular/core';
import {Turno} from '../model/turno';
import {Genero} from '../model/genero';
import {Puesto} from "../model/Puesto";
import {Modalidad} from "../model/Modalidad";
import {EstadoCivil} from "../model/Estado-civil";
import {NivelEducativo} from "../model/Nivel-educativo";

@Injectable({
    providedIn: 'root'
})
export class EnumService {
    turnos: object[] = [];
    generos: object[] = [];
    puestos: object[] = [];
    modalidades: object[] = [];
    estadosCiviles: object[] = [];
    nivelesEducativos: object[] = [];

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
        EstadoCivil.values().forEach(value => {
            this.estadosCiviles.push({label: value, value});
        })
        NivelEducativo.values().forEach(value => {
            this.nivelesEducativos.push({label: value, value});
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
    getEstadosCiviles(): object[] {
        return this.estadosCiviles;
    }
    getNivelesEducativos(): object[] {
        return this.nivelesEducativos;
    }
}
