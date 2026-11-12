import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-barra', standalone: true, imports: [RouterLink, RouterLinkActive],
  template: `<nav class="navbar navbar-dark bg-dark"><div class="container"><a class="navbar-brand fw-bold" routerLink="/clases">GymFit Admin</a><div class="d-flex gap-3"><a class="text-white" routerLink="/clases" routerLinkActive="fw-bold">Clases</a><a class="text-white" routerLink="/matriculas" routerLinkActive="fw-bold">Matrículas</a></div></div></nav>`
})
export class BarraComponent {}
