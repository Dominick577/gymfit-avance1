/**
 * core-js/validadores.js (S3 - GymFit)
 * Validadores con expresiones regulares y template literals
 */

// Correo institucional / corporativo del gimnasio (@utp.edu.pe o @gymfit.pe)
const REGEX_CORREO = /^[a-zA-Z0-9._%+-]+@(utp\.edu\.pe|gymfit\.pe)$/;

// Código de socio / miembro (U mayúscula + 8 dígitos numéricos)
const REGEX_CODIGO_SOCIO = /^U\d{8}$/;

// Hora formato 24 horas (HH:mm) de 00:00 a 23:59
const REGEX_HORA = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Fecha formato ISO (AAAA-MM-DD)
const REGEX_FECHA = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

function validarCorreo(correo) {
  if (!REGEX_CORREO.test(correo)) {
    throw new Error(`El correo '${correo}' no es válido. Debe pertenecer al dominio institucional @utp.edu.pe o @gymfit.pe.`);
  }
  return true;
}

function validarCodigoSocio(codigo) {
  if (!REGEX_CODIGO_SOCIO.test(codigo)) {
    throw new Error(`El código de socio '${codigo}' es incorrecto. Debe iniciar con 'U' seguido de 8 dígitos numéricos.`);
  }
  return true;
}

function validarHora(hora) {
  if (!REGEX_HORA.test(hora)) {
    throw new Error(`La hora '${hora}' no cumple con el formato militar de 24 horas (HH:mm).`);
  }
  return true;
}

function validarFecha(fecha) {
  if (!REGEX_FECHA.test(fecha)) {
    throw new Error(`La fecha '${fecha}' no cumple con el formato estándar AAAA-MM-DD.`);
  }
  return true;
}

module.exports = {
  REGEX_CORREO,
  REGEX_CODIGO_SOCIO,
  REGEX_HORA,
  REGEX_FECHA,
  validarCorreo,
  validarCodigoSocio,
  validarHora,
  validarFecha
};
