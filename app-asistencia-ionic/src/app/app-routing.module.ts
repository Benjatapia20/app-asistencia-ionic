import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./pages/guards/auth.guard";
import { StartGuard } from "./pages/guards/start.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    // Redirige al login si la app se abre sin una ruta específica
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [StartGuard] //Permite acceder sólo si el usuario NO ha iniciado sesión
  },
  {
    path: 'restablecer-contrasena',
    loadChildren: () => import('./pages/restablecer-contrasena/restablecer-contrasena.module').then(m => m.RestablecerContrasenaPageModule)
    // Página para recuperar/restablecer la contraseña
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate: [AuthGuard]
    //La ruta está protegida, sólo es accesible si el usuario está autenticado
  },
  
  {
  path: 'registro',
  loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
    //Error de la Página 404 si la ruta no existe
  }
];

//PreloadAllModules: Mejora el rendimiento cargando todos los módulos en segundo plano
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
  //El PreloadAllModules mejora el rendimiento cargando cada módulo en segundo plano.
})
export class AppRoutingModule {}
