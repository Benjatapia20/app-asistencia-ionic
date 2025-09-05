//Página que simula el envío de instrucciones para recuperar contraseñas.
import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Component({
    selector: 'app-restablecer-contrasena',
    templateUrl: './restablecer-contrasena.page.html',
    styleUrls: ['./restablecer-contrasena.page.scss']
})
export class RestablecerContrasenaPage {
    usuario = '';

    constructor(private toastCtrl: ToastController) {}

    async restablecer() {
        const t = await this.toastCtrl.create({
            message: this.usuario
              ? 'Se han enviado instrucciones a ${this.usuario}'
              : 'Ingresa tu nombre de usuario',
            duration: 1500,
            position: 'top'
        });
        t.present();
    }
}