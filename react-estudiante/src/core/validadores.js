export const REGEX_CORREO = /^[a-z0-9._%+-]+@(utp\.edu\.pe|gymfit\.pe)$/i;
export const REGEX_CODIGO = /^[UA]\d{8}$/;
export const REGEX_HORA = /^([01]\d|2[0-3]):[0-5]\d$/;
export const REGEX_FECHA = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export function validarCorreo(valor) {
  if (!REGEX_CORREO.test(valor)) throw new Error(`El correo '${valor}' no es válido; usa @utp.edu.pe o @gymfit.pe.`);
  return true;
}
export function validarCodigo(valor) {
  if (!REGEX_CODIGO.test(valor)) throw new Error(`El código '${valor}' debe ser U o A seguido de 8 dígitos.`);
  return true;
}
export function validarHora(valor) {
  if (!REGEX_HORA.test(valor)) throw new Error(`La hora '${valor}' debe tener formato HH:mm.`);
  return true;
}
export function validarFecha(valor) {
  if (!REGEX_FECHA.test(valor) || Number.isNaN(Date.parse(`${valor}T00:00:00Z`)) ||
      new Date(`${valor}T00:00:00Z`).toISOString().slice(0, 10) !== valor)
    throw new Error(`La fecha '${valor}' debe ser una fecha real AAAA-MM-DD.`);
  return true;
}
export function validarCapacidad(valor) {
  if (!Number.isInteger(Number(valor)) || Number(valor) < 1 || Number(valor) > 60)
    throw new Error(`La capacidad '${valor}' debe estar entre 1 y 60.`);
  return true;
}
