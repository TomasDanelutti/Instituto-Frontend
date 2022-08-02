import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramasPage } from './programas.page';

const routes: Routes = [
  {
    path: 'crear-modificar-programa',
    loadChildren: () => import('./crear-modificar-programa/crear-modificar-programa.module').then( m => m.CrearModificarProgramaPageModule)
  },
  {
    path: '',
    component: ProgramasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramasPageRoutingModule {}
