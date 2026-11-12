import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraComponent } from './barra.component';
@Component({ selector: 'app-root', standalone: true, imports: [RouterOutlet, BarraComponent], template: '<app-barra /><main class="container py-4"><router-outlet /></main>' })
export class AppComponent {}
