/**
 * core-js/estadisticas.js (S2, S4, S5 - GymFit)
 * Métodos de análisis y generador closure
 */

// 1. Reservas por estado usando reduce
function contarReservasPorEstado(reservas) {
  return reservas.reduce((acumulador, reserva) => {
    const estado = reserva.estado;
    acumulador[estado] = (acumulador[estado] || 0) + 1;
    return acumulador;
  }, {});
}

// 2. Horas reservadas por área usando Map
function calcularOcupacionPorLaboratorio(reservas) {
  const mapa = new Map();
  reservas.forEach((reserva) => {
    if (reserva.estado !== 'CANCELADA') {
      const actual = mapa.get(reserva.laboratorioId) || 0;
      mapa.set(reserva.laboratorioId, actual + reserva.duracionHoras());
    }
  });
  return mapa;
}

// 3. Sedes únicas de GymFit usando Set
function obtenerSedesUnicas(laboratorios) {
  const setSedes = new Set(laboratorios.map(lab => lab.sede));
  return Array.from(setSedes);
}

// 4. Ranking de áreas/disciplinas más reservadas usando sort y operador spread (...)
function obtenerRankingLaboratorios(reservas, laboratorios) {
  const conteo = reservas.reduce((acc, r) => {
    if (r.estado !== 'CANCELADA') {
      acc[r.laboratorioId] = (acc[r.laboratorioId] || 0) + 1;
    }
    return acc;
  }, {});

  const listaConConteo = laboratorios.map(lab => ({
    ...lab,
    totalReservas: conteo[lab.id] || 0
  }));

  return [...listaConConteo].sort((a, b) => b.totalReservas - a.totalReservas);
}

// 5. Generador de códigos de reserva con closure y padStart (GYM-0001, GYM-0002...)
function crearGeneradorCodigoReserva(prefijo = 'GYM', longitud = 4) {
  let contador = 0;
  return function generarCodigo() {
    contador += 1;
    return `${prefijo}-${String(contador).padStart(longitud, '0')}`;
  };
}

module.exports = {
  contarReservasPorEstado,
  calcularOcupacionPorLaboratorio,
  obtenerSedesUnicas,
  obtenerRankingLaboratorios,
  crearGeneradorCodigoReserva
};
