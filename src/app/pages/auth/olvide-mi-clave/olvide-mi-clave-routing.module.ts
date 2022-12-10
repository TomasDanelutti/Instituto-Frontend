import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvideMiClavePage } from './olvide-mi-clave.page';

const routes: Routes = [
  {
    path: '',
    component: OlvideMiClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvideMiClavePageRoutingModule {}
