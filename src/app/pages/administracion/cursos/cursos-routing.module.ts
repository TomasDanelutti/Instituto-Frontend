import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosPage } from './cursos.page';

const routes: Routes = [
  {
    path: 'crear-modificar-curso',
    loadChildren: () => import('./crear-modificar-curso/crear-modificar-curso.module').then( m => m.CrearModificarCursoPageModule)
  },
  {
    path: '',
    component: CursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosPageRoutingModule {}
