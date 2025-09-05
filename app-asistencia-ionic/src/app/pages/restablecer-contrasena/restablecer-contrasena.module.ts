import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { RestablecerContrasenaPageRoutingModule } from './restablecer-contrasena-routing.module';
import { RestablecerContrasenaPage } from './restablecer-contrasena.page';

@NgModule({
    //Se importan IonicModule, FormsModule con su Routing propio.
    imports: [CommonModule, FormsModule, IonicModule, RestablecerContrasenaPageRoutingModule],
    declarations: [RestablecerContrasenaPage],
})

export class RestablecerContrasenaPageModule {}
//Módulo que agrupa lo necesario para la página de Restablecer Contraseña