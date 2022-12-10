export enum EstadoCivil {
    "Soltero/a", "Casado/a", "Viudo/a", "Unión convivencial"
}

export namespace EstadoCivil {
    export function values() {
        return Object.keys(EstadoCivil).filter(
            (type) => isNaN(<any> type) && type !== 'values'
        );
    }
}
