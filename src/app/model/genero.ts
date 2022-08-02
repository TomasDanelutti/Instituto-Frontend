export enum Genero {
    Femenino, Masculino, Otro
}

export namespace Genero {
    export function values() {
        return Object.keys(Genero).filter(
            (type) => isNaN(<any> type) && type !== 'values'
        );
    }
}
