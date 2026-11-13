import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Clase, Matricula } from './modelos';
import { GymfitService } from './gymfit.service';
function codigoGymFit(control: AbstractControl): ValidationErrors | null {
  return /^GYM-[A-Z]{2,4}-\d{3}$/.test(control.value || '') ? null : { codigoGymFit: true };
}
@Component({
  standalone: true, imports: [NgIf, ReactiveFormsModule, RouterLink],
  template: `<h1>{{id ? 'Editar clase' : 'Nueva clase'}}</h1>
    <p *ngIf="error" class="alert alert-danger">{{error}}</p>
    <form class="card card-body" [formGroup]="form" (ngSubmit)="guardar()" novalidate>
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label" for="codigo">Código</label><input id="codigo" class="form-control" formControlName="codigo">
          <small class="text-danger" *ngIf="form.controls.codigo.touched && form.controls.codigo.invalid">Usa GYM-XXX-000.</small></div>
        <div class="col-md-6"><label class="form-label" for="nombre">Nombre</label><input id="nombre" class="form-control" formControlName="nombre">
          <small class="text-danger" *ngIf="form.controls.nombre.touched && form.controls.nombre.invalid">Nombre requerido.</small></div>
        <div class="col-md-6"><label class="form-label" for="sede">Sede</label><input id="sede" class="form-control" formControlName="sede">
          <small class="text-danger" *ngIf="form.controls.sede.touched && form.controls.sede.invalid">Sede requerida.</small></div>
        <div class="col-md-6"><label class="form-label" for="instructor">Instructor</label><input id="instructor" class="form-control" formControlName="instructor">
          <small class="text-danger" *ngIf="form.controls.instructor.touched && form.controls.instructor.invalid">Instructor requerido.</small></div>
        <div class="col-md-4"><label class="form-label" for="fecha">Fecha</label><input id="fecha" type="date" class="form-control" formControlName="fecha">
          <small class="text-danger" *ngIf="form.controls.fecha.touched && form.controls.fecha.invalid">Fecha requerida.</small></div>
        <div class="col-md-4"><label class="form-label" for="inicio">Inicio</label><input id="inicio" type="time" class="form-control" formControlName="horaInicio">
          <small class="text-danger" *ngIf="form.controls.horaInicio.touched && form.controls.horaInicio.invalid">Hora requerida.</small></div>
        <div class="col-md-4"><label class="form-label" for="fin">Fin</label><input id="fin" type="time" class="form-control" formControlName="horaFin">
          <small class="text-danger" *ngIf="form.controls.horaFin.touched && form.controls.horaFin.invalid">Hora requerida.</small></div>
        <div class="col-md-6"><label class="form-label" for="capacidad">Capacidad (1–60)</label><input id="capacidad" type="number" class="form-control" formControlName="capacidad">
          <small class="text-danger" *ngIf="form.controls.capacidad.touched && form.controls.capacidad.invalid">Debe ser entre 1 y 60.</small></div>
        <div class="col-md-6"><label class="form-label" for="estado">Estado</label><select id="estado" class="form-select" formControlName="estado"><option value="disponible">Disponible</option><option value="mantenimiento">Mantenimiento</option></select></div>
      </div><div class="d-flex gap-2 mt-4"><button class="btn btn-primary" type="submit">Guardar</button><a class="btn btn-secondary" routerLink="/clases">Cancelar</a></div>
    </form>`
})
export class FormularioClaseComponent implements OnInit {
  private fb = inject(FormBuilder); private api = inject(GymfitService);
  private ruta = inject(ActivatedRoute); private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  id = this.ruta.snapshot.paramMap.get('id'); error = ''; matriculas: Matricula[] = [];
  form = this.fb.nonNullable.group({
    codigo: ['', [Validators.required, codigoGymFit]],
    nombre: ['', Validators.required], sede: ['', Validators.required],
    instructor: ['', Validators.required], fecha: ['', Validators.required],
    horaInicio: ['', Validators.required], horaFin: ['', Validators.required],
    capacidad: [10, [Validators.required, Validators.min(1), Validators.max(60)]],
    estado: ['disponible' as Clase['estado'], Validators.required]
  });
  ngOnInit() {
    if (!this.id) return;
    forkJoin({ clase: this.api.clase(this.id), matriculas: this.api.matriculas() }).subscribe({
      next: ({ clase, matriculas }) => { this.form.patchValue(clase); this.matriculas = matriculas; this.cdr.markForCheck(); },
      error: () => { this.error = 'No se pudo cargar la clase.'; this.cdr.markForCheck(); }
    });
  }
  guardar() {
    this.error = '';
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const clase = this.form.getRawValue();
    if (clase.horaFin <= clase.horaInicio) { this.error = 'La hora de fin debe ser posterior al inicio.'; return; }
    const ocupacion = this.matriculas.filter(m => String(m.claseId) === String(this.id) && m.estado !== 'rechazada').length;
    if (clase.capacidad < ocupacion) { this.error = `La capacidad no puede ser menor que las ${ocupacion} matrículas activas.`; return; }
    const peticion = this.id ? this.api.actualizar(this.id, clase) : this.api.crear(clase);
    peticion.subscribe({
      next: () => this.router.navigate(['/clases']),
      error: () => { this.error = 'No se pudo guardar la clase en la API.'; this.cdr.markForCheck(); }
    });
  }
}
