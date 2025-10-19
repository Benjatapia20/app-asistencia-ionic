//Módulo que define todas las rutas principales de la app.
//Indica la página a cargar según la URL, aplicando protecciones con el AuthGuard para hacer privadas las rutas.
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./pages/guards/auth.guard";
//El AuthGuard se encarga de la verificar la autenticación del usuario.

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    //El Path redirige al login cuando la app abre sin una ruta en específico.
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    //El Path "login" carga la página del inicio de sesión.
  },
  {
    path: 'restablecer-contrasena',
    loadChildren: () => import('./pages/restablecer-contrasena/restablecer-contrasena.module').then(m => m.RestablecerContrasenaPageModule)
    //El Path "restablecer-contrasena" carga la página para la recuperación de la contraseña y/o restablecer contraseña.
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate: [AuthGuard]
    //El Path "inicio" está como ruta protegida.
    //Sólo se accede si el AuthGuard lo autoriza con la autenticación del usuario.
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
    //El Path muestra la página de error "Not Found" si la ruta no existe.
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
  //El PreloadAllModules mejora el rendimiento cargando cada módulo en segundo plano.
})
export class AppRoutingModule {}
