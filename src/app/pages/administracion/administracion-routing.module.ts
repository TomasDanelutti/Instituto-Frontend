import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracionPage } from './administracion.page';

const routes: Routes = [
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./usuarios/empleados/empleados.module').then(m => m.EmpleadosPageModule)
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./usuarios/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  },
  {
    path: '',
    component: AdministracionPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosPageRoutingModule {}
