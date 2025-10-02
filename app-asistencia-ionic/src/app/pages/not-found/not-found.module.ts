//Módulo de Angular que agrupa todo lo relacionado con la página.
//Le dice a Angular los componentes, directivas o servicios que se usan en la página.
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

//Se importan NotFoundPage con su routing.module para poder usarlo en las rutas.
import { NotFoundPageRoutingModule } from "./not-found-routing.module";
import { NotFoundPage } from "./not-found.page";

//Es como una "Carpeta De Configuración" de la página NotFound, la cuál organiza lo que necesita para funcionar.
@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, NotFoundPageRoutingModule],
    declarations: [NotFoundPage]
})
export class NotFoundPageModule {}
