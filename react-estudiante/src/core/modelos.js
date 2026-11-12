export class Usuario {
  constructor({ id, nombre, correo, codigo, rol = 'estudiante', password = '' }) {
    Object.assign(this, { id, nombre, correo, codigo, rol, password });
  }
  get esAdministrador() { return this.rol === 'admin'; }
  obtenerPerfil() { return `${this.nombre} (${this.codigo})`; }
}

export class Clase {
  constructor({ id, nombre, sede, capacidad, fecha, horaInicio, horaFin, estado = 'disponible', instructor = '' }) {
    Object.assign(this, { id, nombre, sede, capacidad, fecha, horaInicio, horaFin, estado, instructor });
  }
  get estaDisponible() { return this.estado === 'disponible'; }
  cuposDisponibles(matriculas) {
    return Math.max(0, this.capacidad - matriculas.filter(m => String(m.claseId) === String(this.id) && m.estado !== 'rechazada').length);
  }
}

export class Matricula {
  constructor({ id, codigo, claseId, usuarioId, estado = 'pendiente', creadoEn = new Date().toISOString() }) {
    Object.assign(this, { id, codigo, claseId, usuarioId, estado, creadoEn });
  }
  get estaActiva() { return this.estado !== 'rechazada'; }
  esDuplicadaDe(otra) {
    return this.estaActiva && otra.estado !== 'rechazada' &&
      String(this.claseId) === String(otra.claseId) && String(this.usuarioId) === String(otra.usuarioId);
  }
  validarCupo(clase, matriculas) {
    if (!clase || !clase.estaDisponible) throw new Error('La clase no está disponible.');
    if (matriculas.some(m => this.esDuplicadaDe(m))) throw new Error('Ya tienes una matrícula activa en esta clase.');
    if (clase.cuposDisponibles(matriculas) <= 0) throw new Error('La clase no tiene cupos disponibles.');
    return true;
  }
}
