export const accionesReseteables = [];

export function Reseteable(target) {
    accionesReseteables.push(Object.create(target));
}
