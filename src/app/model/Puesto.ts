export enum Puesto {
    Administrativo, Profesor
}

export namespace Puesto {
    export function values() {
        return Object.keys(Puesto).filter(
            (type) => isNaN(<any> type) && type !== 'values'
        );
    }
}
