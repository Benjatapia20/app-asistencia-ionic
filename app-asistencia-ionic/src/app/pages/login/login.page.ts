//Componente principal de la página del ingreso de usuarios.
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
import { SQLiteService } from "../services/sqlite.service";

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
        private storage: Storage,
        private sqliteService: SQLiteService
    ) {
        this.initStorage();
    }

    async initStorage() {
        await this.storage.create();
    }

    //Método para el inicio de sesión
    async ingresar() {
        if (!this.usuario || !this.password) {
            const t = await this.toastCtrl.create({
                message: 'Completa cada campo con tu Usuario y Contraseña',
                duration: 1500,
                position: 'top'
            });
            return t.present();
        }

        try {
            //Verificación del usuario en la base de datos SQLite
            const user = await this.sqliteService.getUser(this.usuario);

            if (!user) {
                const toast = await this.toastCtrl.create({
                    message: 'Usuario No Encotrado',
                    duration: 1500,
                    position: 'top'
                });
                return toast.present();
            }

            if (user.password !== this.password) {
                const toast = await this.toastCtrl.create({
                    message: 'Contraseña Incorrecta',
                    duration: 1500,
                    position: 'top'
                });
                return toast.present();
            }

            //Si las validaciones pasan, se guarda sesión regresando a la página INICIO
            await this.storage.set('isLoggedIn', true);
            await this.storage.set('usuario', this.usuario);

            const toast = await this.toastCtrl.create({
                message: `Bienvenido/a, ${this.usuario}`,
                duration: 1500,
                position: 'top'
            });
            await toast.present();

            this.router.navigate(['/inicio'],{ state: { usuario: this.usuario } });
        } catch (error) {
            console.error('Error Al Ingresar:', error);
            const toast = await this.toastCtrl.create({
                message: 'Error Al Iniciar Sesión',
                duration: 1500,
                position: 'top',
            });
            toast.present();
        }
    }

    irRestablecer() {
        this.router.navigate(['/restablecer-contrasena']);
    }
}