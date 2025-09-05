import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioPage } from "./inicio.page";

const routes: Routes = [
    {
        path: '',
        component: InicioPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InicioPageRoutingModule {}
//Define la ruta '' (vacía) que carga la página InicioPage, permitiendo acceder a la página con el Path '/inicio'.