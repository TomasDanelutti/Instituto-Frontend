import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearModificarCursoPage } from './crear-modificar-curso.page';

const routes: Routes = [
  {
    path: '',
    component: CrearModificarCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearModificarCursoPageRoutingModule {}
