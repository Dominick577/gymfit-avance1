export interface Usuario {
  id: string; nombre: string; correo: string; codigo: string; rol: 'estudiante' | 'admin'; password: string;
}
export interface Clase {
  id: string; codigo: string; nombre: string; sede: string; instructor: string;
  fecha: string; horaInicio: string; horaFin: string; capacidad: number; estado: 'disponible' | 'mantenimiento';
}
export interface Matricula {
  id: string; codigo: string; claseId: string; usuarioId: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada'; creadoEn: string;
}
