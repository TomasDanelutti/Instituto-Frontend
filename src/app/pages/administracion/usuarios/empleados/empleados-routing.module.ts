import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadosPage } from './empleados.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadosPage
  },
  {
    path: 'crear-modificar-empleado',
    loadChildren: () => import('./crear-modificar-empleados/crear-modificar-empleados.module').then(m => m.CrearModificarEmpleadosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadosPageRoutingModule {}
