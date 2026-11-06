/**
 * core-js/modelos.js (S4 - GymFit)
 * Clases Usuario, Disciplina/Area y Reserva
 */

class Usuario {
  constructor(id, codigo, nombre, correo, rol = 'socio') {
    this._id = id;
    this._codigo = codigo;
    this._nombre = nombre;
    this._correo = correo;
    this._rol = rol;
  }

  get id() { return this._id; }
  get codigo() { return this._codigo; }
  get nombre() { return this._nombre; }
  get correo() { return this._correo; }
  get rol() { return this._rol; }

  obtenerPerfil() {
    return `[${this._codigo}] ${this._nombre} - Plan GymFit (${this._rol})`;
  }
}

class Laboratorio { // Representa el Área / Salón / Disciplina del Catálogo de GymFit
  constructor(id, nombre, sede, pabellon, capacidad, enMantenimiento = false) {
    this._id = id;
    this._nombre = nombre; // Ej: Zona Musculación, Salón de Spinning, Área Funcional
    this._sede = sede; // Sede GymFit (Lima Centro, San Isidro, etc.)
    this._pabellon = pabellon; // Zona / Nivel
    this._capacidad = capacidad;
    this._enMantenimiento = enMantenimiento;
  }

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  get sede() { return this._sede; }
  get pabellon() { return this._pabellon; }
  get capacidad() { return this._capacidad; }
  get enMantenimiento() { return this._enMantenimiento; }

  set enMantenimiento(valor) {
    this._enMantenimiento = Boolean(valor);
  }

  estaDisponible() {
    return !this._enMantenimiento;
  }
}

class Reserva {
  constructor(id, codigo, laboratorioId, usuarioCodigo, fecha, horaInicio, horaFin, estado = 'PENDIENTE') {
    this._id = id;
    this._codigo = codigo;
    this._laboratorioId = laboratorioId;
    this._usuarioCodigo = usuarioCodigo;
    this._fecha = fecha;
    this._horaInicio = horaInicio;
    this._horaFin = horaFin;
    this._estado = estado; // PENDIENTE, CONFIRMADA, CANCELADA, COMPLETADA
  }

  get id() { return this._id; }
  get codigo() { return this._codigo; }
  get laboratorioId() { return this._laboratorioId; }
  get usuarioCodigo() { return this._usuarioCodigo; }
  get fecha() { return this._fecha; }
  get horaInicio() { return this._horaInicio; }
  get horaFin() { return this._horaFin; }
  get estado() { return this._estado; }
  set estado(nuevo) { this._estado = nuevo; }

  duracionHoras() {
    const [hIni, mIni] = this._horaInicio.split(':').map(Number);
    const [hFin, mFin] = this._horaFin.split(':').map(Number);
    const minInicio = hIni * 60 + mIni;
    const minFin = hFin * 60 + mFin;
    return (minFin - minInicio) / 60;
  }

  seCruzaCon(otra) {
    if (this._laboratorioId !== otra.laboratorioId || this._fecha !== otra.fecha) {
      return false;
    }
    if (this._estado === 'CANCELADA' || otra.estado === 'CANCELADA') {
      return false;
    }

    const [hIni1, mIni1] = this._horaInicio.split(':').map(Number);
    const [hFin1, mFin1] = this._horaFin.split(':').map(Number);
    const [hIni2, mIni2] = otra.horaInicio.split(':').map(Number);
    const [hFin2, mFin2] = otra.horaFin.split(':').map(Number);

    const inicio1 = hIni1 * 60 + mIni1;
    const fin1 = hFin1 * 60 + mFin1;
    const inicio2 = hIni2 * 60 + mIni2;
    const fin2 = hFin2 * 60 + mFin2;

    return inicio1 < fin2 && inicio2 < fin1;
  }
}

module.exports = {
  Usuario,
  Laboratorio,
  Reserva
};
