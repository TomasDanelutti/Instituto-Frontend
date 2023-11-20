export const accionesReseteables = [];

export const Reseteable = target => {
    accionesReseteables.push(Object.create(target));
};
