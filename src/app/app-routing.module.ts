import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'administrar',
    loadChildren: () => import('./pages/administracion/administracion.module').then(m => m.CursosPageModule)
  },
  {
    path: 'registrar-alumno',
    loadChildren: () => import('./pages/auth/registrar-alumno/registrar-alumno.module').then( m => m.RegistrarAlumnoPageModule)
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./pages/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
  },
  {
    path: 'lista-cursos',
    loadChildren: () => import('./pages/lista-cursos/lista-cursos.module').then(m => m.ListaCursosPageModule)
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
