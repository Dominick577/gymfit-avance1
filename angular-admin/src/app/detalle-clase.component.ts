import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Clase } from './modelos';
import { GymfitService } from './gymfit.service';
@Component({
  standalone: true, imports: [NgIf, RouterLink],
  template: `<p *ngIf="error" class="alert alert-danger">{{error}}</p><article *ngIf="clase" class="card card-body">
    <h1>{{clase.nombre}}</h1><p>Código: {{clase.codigo}}</p><p>Sede: {{clase.sede}}</p>
    <p>Instructor: {{clase.instructor}}</p><p>Fecha: {{clase.fecha}}</p>
    <p>Horario: {{clase.horaInicio}}–{{clase.horaFin}}</p><p>Capacidad: {{clase.capacidad}}</p>
    <p>Estado: {{clase.estado}}</p><a [routerLink]="['/clases', clase.id, 'editar']">Editar</a></article>`
})
export class DetalleClaseComponent implements OnInit {
  private api = inject(GymfitService); private ruta = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  clase?: Clase; error = '';
  ngOnInit() { this.api.clase(this.ruta.snapshot.paramMap.get('id') || '').subscribe({
    next: clase => { this.clase = clase; this.cdr.markForCheck(); },
    error: () => { this.error = 'Clase no encontrada.'; this.cdr.markForCheck(); }
  }); }
}
