export enum NivelEducativo {
    "Primario",
    "Primario en curso",
    "Secundario",
    "Secundario en curso",
    "Terciario",
    "Trciario en curso",
    "Universitario",
    "Universitario en curso"
}

export namespace NivelEducativo {
    export function values() {
        return Object.keys(NivelEducativo).filter(
            (type) => isNaN(<any> type) && type !== 'values'
        );
    }
}
