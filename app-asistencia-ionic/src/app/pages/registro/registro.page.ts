import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { SQLiteService } from "../services/sqlite.service";

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
    standalone: false,
})
export class RegistroPage {
    usuario = '';
    password = '';
    confirmar = '';

    constructor (private router: Router, private toastCtrl: ToastController, private sqliteService: SQLiteService) {}

    async registrar() {
        if(!this.usuario || !this.password || !this.confirmar) {
            return this.mostrarToast('Completa cada campo.');
        }

        if(this.password !== this.confirmar) {
            return this.mostrarToast('Las contraseñas ingresadas no coinciden.');
        }

        try {
            const userExistente = await this.sqliteService.getUser(this.usuario);
            if (userExistente) {
                return this.mostrarToast('Usuario existente.');
            }

            await this.sqliteService.saveUser(this.usuario, this.password);
            await this.mostrarToast('Usuario registrado correctamente.');

            this.usuario = '';
            this.password = '';
            this.confirmar = '';

            this.router.navigate(['/login']);
        } catch (err) {
            console.error('Error en el registro de usuario', err);
            this.mostrarToast('Error en el registro de usuario');
        }
    }

    private async mostrarToast(mensaje: string) {
        const toast = await this.toastCtrl.create({
            message: mensaje,
            duration: 2000,
            position: 'top',
        });
        await toast.present();
    }
}