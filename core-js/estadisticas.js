export const contarMatriculasPorEstado = matriculas => matriculas.reduce((acc, m) => {
  acc[m.estado] = (acc[m.estado] || 0) + 1;
  return acc;
}, {});

export function calcularOcupacionPorClase(matriculas) {
  const ocupacion = new Map();
  matriculas.filter(m => m.estado !== 'rechazada').forEach(m =>
    ocupacion.set(String(m.claseId), (ocupacion.get(String(m.claseId)) || 0) + 1));
  return ocupacion;
}
export const obtenerSedesUnicas = clases => [...new Set(clases.map(c => c.sede))];
export function obtenerRankingClases(matriculas, clases) {
  const ocupacion = calcularOcupacionPorClase(matriculas);
  return [...clases.map(c => ({ ...c, totalMatriculas: ocupacion.get(String(c.id)) || 0 }))]
    .sort((a, b) => b.totalMatriculas - a.totalMatriculas);
}
export function crearGeneradorCodigoMatricula(prefijo = 'MAT', inicio = 0) {
  let contador = inicio;
  return () => `${prefijo}-${String(++contador).padStart(4, '0')}`;
}
