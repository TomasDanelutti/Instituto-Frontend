import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnosPage } from './alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnosPage
  },
  {
    path: 'crear-modificar-alumno',
    loadChildren: () => import('./crear-modificar-alumno/crear-modificar-alumno.module').then( m => m.CrearModificarAlumnoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosPageRoutingModule {}
