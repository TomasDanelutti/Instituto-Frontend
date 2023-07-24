import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
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
    path: 'lista-cursos',
    loadChildren: () => import('./pages/lista-cursos/lista-cursos.module').then(m => m.ListaCursosPageModule)
  },
  {
    path: 'mis-cursos',
    loadChildren: () => import('./pages/mis-cursos/mis-cursos.module').then( m => m.MisCursosPageModule)
  },
  {
    path: 'olvideMiClave',
    loadChildren: () => import('./pages/auth/olvide-mi-clave/olvide-mi-clave.module').then( m => m.OlvideMiClavePageModule)
  },
  {
    path: 'generarClave/:uuid',
    loadChildren: () => import('./pages/auth/generar-clave/generar-clave.module').then( m => m.GenerarClavePageModule)
  },
  {
    path: 'datosPersonales',
    loadChildren: () => import('./pages/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule)
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
