//Define las ruta específica para la página NotFound
//Indica a Angular qué componentes, directivas o servicios se usan en la página.
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundPage } from "./not-found.page";

//Este archivo conecta la URL con la página que debe mostrarse cuando la ruta no existe.
const routes: Routes = [
    {
        path: '',
        component: NotFoundPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotFoundPageRoutingModule {}
