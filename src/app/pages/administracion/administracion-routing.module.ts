import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracionPage } from './administracion.page';

const routes: Routes = [
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'programas',
    loadChildren: () => import('./programas/programas.module').then( m => m.ProgramasPageModule)
  },
  {
    path: 'administrativos',
    loadChildren: () => import('./usuarios/administrativos/administrativos.module').then( m => m.AdministrativosPageModule)
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./usuarios/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  },
  {
    path: '',
    component: AdministracionPage
  },
  {
    path: 'profesores',
    loadChildren: () => import('./profesores/profesores.module').then( m => m.ProfesoresPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosPageRoutingModule {}
