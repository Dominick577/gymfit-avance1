import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'estadoMatricula', standalone: true })
export class EstadoMatriculaPipe implements PipeTransform {
  transform(estado: string): string {
    return ({ pendiente: '⏳ Pendiente', aprobada: '✓ Aprobada', rechazada: '✕ Rechazada' } as Record<string, string>)[estado] || estado;
  }
}
