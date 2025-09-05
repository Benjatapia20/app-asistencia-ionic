import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
    //Se importan IonicModule, FormsModule y su Routing propio.
    imports: [CommonModule, FormsModule, IonicModule, LoginPageRoutingModule],
    declarations: [LoginPage],
})

export class LoginPageModule {}
//Módulo que agrupa lo necesario para la página Login