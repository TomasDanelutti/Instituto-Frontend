import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearModificarProgramaPage } from './crear-modificar-programa.page';

const routes: Routes = [
  {
    path: '',
    component: CrearModificarProgramaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearModificarProgramaPageRoutingModule {}
