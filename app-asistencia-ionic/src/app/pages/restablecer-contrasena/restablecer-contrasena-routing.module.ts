import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RestablecerContrasenaPage } from "./restablecer-contrasena.page";

const routes: Routes = [
    {
        path: '',
        component: RestablecerContrasenaPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RestablecerContrasenaPageRoutingModule {}
//Define la ruta '' (vacía) que carga la página RestablecerContrasenaPage
//Permitiendo acceder con el path '/restablecer-contrasena'.