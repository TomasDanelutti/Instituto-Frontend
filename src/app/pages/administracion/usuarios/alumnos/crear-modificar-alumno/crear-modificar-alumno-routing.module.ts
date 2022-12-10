import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearModificarAlumnoPage } from './crear-modificar-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: CrearModificarAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearModificarAlumnoPageRoutingModule {}
