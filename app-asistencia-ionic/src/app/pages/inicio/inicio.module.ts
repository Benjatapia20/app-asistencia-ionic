import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { InicioPageRoutingModule } from './inicio-routing.module';
import { InicioPage } from './inicio.page';

@NgModule({
    //Se importan IonicModule, FormsModule con su routing propio.
    imports: [CommonModule, FormsModule, IonicModule, InicioPageRoutingModule],
    declarations: [InicioPage],
})

export class InicioPageModule {}
//Módulo que agrupa lo necesario para la página Inicio.
//Encapsula lo que la página Inicio requiere para que funcione dentro de la aplicación.