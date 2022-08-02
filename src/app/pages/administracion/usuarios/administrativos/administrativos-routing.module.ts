import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrativosPage } from './administrativos.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrativosPage
  },
  {
    path: 'crear-modificar-administrativo',
    loadChildren: () => import('./crear-modificar-administrativo/crear-modificar-administrativo.module').then( m => m.CrearModificarAdministrativoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrativosPageRoutingModule {}
