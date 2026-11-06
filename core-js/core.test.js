/**
 * core-js/core.test.js (S6 - GymFit)
 * 8 Casos de prueba evaluados con: node --test
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
  validarCorreo,
  validarCodigoSocio,
  validarHora,
  validarFecha
} = require('./validadores');

const { Usuario, Laboratorio, Reserva } = require('./modelos');

const {
  contarReservasPorEstado,
  calcularOcupacionPorLaboratorio,
  obtenerSedesUnicas,
  obtenerRankingLaboratorios,
  crearGeneradorCodigoReserva
} = require('./estadisticas');

test('Caso 1: Validador de correo institucional/GymFit (@utp.edu.pe o @gymfit.pe)', () => {
  assert.equal(validarCorreo('u20231759@utp.edu.pe'), true);
  assert.equal(validarCorreo('admin@gymfit.pe'), true);
  assert.throws(() => validarCorreo('usuario@gmail.com'), /no es válido/);
});

test('Caso 2: Validador de código de alumno/socio (U + 8 dígitos)', () => {
  assert.equal(validarCodigoSocio('U20231759'), true);
  assert.throws(() => validarCodigoSocio('A12345678'), /debe iniciar con 'U'/i);
  assert.throws(() => validarCodigoSocio('U123'), /8 dígitos/i);
});

test('Caso 3: Validador de formato de hora HH:mm y fecha AAAA-MM-DD', () => {
  assert.equal(validarHora('07:30'), true);
  assert.equal(validarFecha('2026-11-06'), true);
  assert.throws(() => validarHora('25:10'), /formato militar/);
  assert.throws(() => validarFecha('06/11/2026'), /formato estándar/);
});

test('Caso 4: Método Reserva.duracionHoras() calcula horas y fracciones', () => {
  const r = new Reserva(1, 'GYM-0001', 1, 'U20231759', '2026-11-06', '06:00', '08:30', 'CONFIRMADA');
  assert.equal(r.duracionHoras(), 2.5);
});

test('Caso 5: Método Reserva.seCruzaCon() detecta solapamiento de horario', () => {
  const r1 = new Reserva(1, 'GYM-0001', 1, 'U20231759', '2026-11-06', '08:00', '10:00', 'CONFIRMADA');
  const r2Solapa = new Reserva(2, 'GYM-0002', 1, 'U18312364', '2026-11-06', '09:00', '10:30', 'PENDIENTE');
  const r3Libre = new Reserva(3, 'GYM-0003', 1, 'U23313500', '2026-11-06', '10:00', '12:00', 'PENDIENTE');

  assert.equal(r1.seCruzaCon(r2Solapa), true);
  assert.equal(r1.seCruzaCon(r3Libre), false);
});

test('Caso 6: Estadísticas - contarReservasPorEstado con reduce', () => {
  const reservas = [
    { estado: 'CONFIRMADA' },
    { estado: 'PENDIENTE' },
    { estado: 'CONFIRMADA' }
  ];
  const resultado = contarReservasPorEstado(reservas);
  assert.deepEqual(resultado, { CONFIRMADA: 2, PENDIENTE: 1 });
});

test('Caso 7: Estadísticas - Sedes únicas con Set y Ranking con sort/spread', () => {
  const areas = [
    { id: 1, nombre: 'Zona Musculación', sede: 'Lima Centro' },
    { id: 2, nombre: 'Salón de Spinning', sede: 'San Isidro' },
    { id: 3, nombre: 'Área Funcional', sede: 'Lima Centro' }
  ];
  const sedes = obtenerSedesUnicas(areas);
  assert.equal(sedes.length, 2);
  assert.ok(sedes.includes('Lima Centro') && sedes.includes('San Isidro'));

  const reservas = [
    { laboratorioId: 1, estado: 'CONFIRMADA' },
    { laboratorioId: 1, estado: 'CONFIRMADA' },
    { laboratorioId: 2, estado: 'CONFIRMADA' }
  ];
  const ranking = obtenerRankingLaboratorios(reservas, areas);
  assert.equal(ranking[0].id, 1);
  assert.equal(ranking[0].totalReservas, 2);
});

test('Caso 8: Generador de códigos GymFit con closure y padStart', () => {
  const generador = crearGeneradorCodigoReserva('GYM', 4);
  assert.equal(generador(), 'GYM-0001');
  assert.equal(generador(), 'GYM-0002');
  assert.equal(generador(), 'GYM-0003');
});
