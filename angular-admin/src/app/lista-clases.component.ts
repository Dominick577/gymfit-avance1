import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Clase, Matricula } from './modelos';
import { GymfitService } from './gymfit.service';
import { MantenimientoDirective } from './mantenimiento.directive';
@Component({
  standalone: true, imports: [NgFor, NgIf, NgClass, RouterLink, MantenimientoDirective],
  template: `<div class="d-flex justify-content-between align-items-center mb-3"><h1>Clases</h1><a class="btn btn-primary" routerLink="/clases/nuevo">Nueva clase</a></div>
    <p *ngIf="error" class="alert alert-danger">{{error}}</p>
    <p *ngIf="cargando">Cargando clases…</p>
    <div class="row g-3"><div class="col-md-6 col-lg-4" *ngFor="let clase of clases">
      <article class="card h-100" [appMantenimiento]="clase.estado === 'mantenimiento'"><div class="card-body">
      <h2 class="h5">{{clase.nombre}}</h2><p>{{clase.sede}} · {{clase.fecha}} {{clase.horaInicio}}</p>
      <p>{{ocupacion(clase.id)}} / {{clase.capacidad}} matrículas activas</p>
      <span class="badge mb-3" [ngClass]="clase.estado === 'disponible' ? 'text-bg-success' : 'text-bg-warning'">{{clase.estado}}</span>
      <div class="d-flex gap-2"><a class="btn btn-sm btn-outline-secondary" [routerLink]="['/clases', clase.id]">Detalle</a>
      <a class="btn btn-sm btn-outline-primary" [routerLink]="['/clases', clase.id, 'editar']">Editar</a>
      <button class="btn btn-sm btn-outline-danger" (click)="eliminar(clase)">Eliminar</button></div>
      </div></article></div></div>`
})
export class ListaClasesComponent implements OnInit {
  private api = inject(GymfitService);
  private cdr = inject(ChangeDetectorRef);
  clases: Clase[] = []; matriculas: Matricula[] = []; error = ''; cargando = true;
  ngOnInit() { this.cargar(); }
  cargar() {
    this.cargando = true;
    forkJoin({ clases: this.api.clases(), matriculas: this.api.matriculas() }).subscribe({
      next: datos => { this.clases = datos.clases; this.matriculas = datos.matriculas; this.cargando = false; this.cdr.markForCheck(); },
      error: () => { this.error = 'No se pudo conectar con la API. Inicia api-mock en el puerto 3000.'; this.cargando = false; this.cdr.markForCheck(); }
    });
  }
  ocupacion(id: string) { return this.matriculas.filter(m => String(m.claseId) === String(id) && m.estado !== 'rechazada').length; }
  eliminar(clase: Clase) {
    this.error = '';
    if (this.matriculas.some(m => String(m.claseId) === String(clase.id))) {
      this.error = 'Esta clase tiene matrículas y no se puede eliminar.';
      return;
    }
    if (!confirm(`¿Eliminar la clase ${clase.nombre}?`)) return;
    this.api.eliminar(clase.id).subscribe({
      next: () => this.cargar(),
      error: () => { this.error = 'No se pudo eliminar la clase.'; this.cdr.markForCheck(); }
    });
  }
}
