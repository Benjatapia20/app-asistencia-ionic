//Componente principal de la página del ingreso de usuarios.
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: false,
})
export class LoginPage {
    usuario = '';
    password = '';

    constructor(
        private router: Router,
        private toastCtrl: ToastController,
        private storage: Storage
    ) {
        this.initStorage();
    }

    async initStorage() {
        await this.storage.create();
    }

    //Se maneja el estado tanto para el nombre de usuario como la contraseña
    async ingresar() {
        if (!this.usuario || !this.password) {
            const t = await this.toastCtrl.create({
                message: 'Completa los campos con tu usuario y contraseña',
                duration: 1500,
                position: 'top'
            });
            return t.present();
        }

        //Se guarda que el usuario esté logueado
        await this.storage.set('isLoggedIn', true);
        await this.storage.set('usuario', this.usuario);

        //Navegar sin validar contra una base de datos (Hacia la página Inicio o también a la página restablecer contraseña)
        this.router.navigate(['/inicio'], { state: { usuario: this.usuario}});
    }

    irRestablecer() {
        this.router.navigate(['/restablecer-contrasena']);
    }
}
