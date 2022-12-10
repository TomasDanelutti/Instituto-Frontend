export enum Turno {
    Mañana, Tarde, Noche

}

export namespace Turno {
    export function values() {
        return Object.keys(Turno).filter(
            (type) => isNaN(<any>type) && type !== 'values'
        );
    }
}
