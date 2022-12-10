import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearModificarEmpleadosPage } from './crear-modificar-empleados.page';

const routes: Routes = [
  {
    path: '',
    component: CrearModificarEmpleadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearModificarEmpleadosPageRoutingModule {}
