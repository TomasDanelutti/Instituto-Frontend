export enum Modalidad {
    Presencial, Virtual, SemiPresencial
}

export namespace Modalidad {
    export function values() {
        return Object.keys(Modalidad).filter(
            (type) => isNaN(<any> type) && type !== 'values'
        );
    }
}
