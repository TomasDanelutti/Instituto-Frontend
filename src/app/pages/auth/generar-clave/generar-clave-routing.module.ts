import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarClavePage } from './generar-clave.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarClavePageRoutingModule {}
