import { Routes } from '@angular/router';
import { ListaClasesComponent } from './lista-clases.component';
import { DetalleClaseComponent } from './detalle-clase.component';
import { FormularioClaseComponent } from './formulario-clase.component';
import { ListaMatriculasComponent } from './lista-matriculas.component';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clases' },
  { path: 'clases', component: ListaClasesComponent },
  { path: 'clases/nuevo', component: FormularioClaseComponent },
  { path: 'clases/:id/editar', component: FormularioClaseComponent },
  { path: 'clases/:id', component: DetalleClaseComponent },
  { path: 'matriculas', component: ListaMatriculasComponent },
  { path: '**', redirectTo: 'clases' }
];
