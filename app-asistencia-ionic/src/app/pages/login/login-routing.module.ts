import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPage } from "./login.page";

const routes: Routes = [
    {
        path: '',
        component: LoginPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LoginPageRoutingModule {}
//Define la ruta '' (vacía) que carga el LoginPage, permitiendo acceder a la página con el path '/login'.