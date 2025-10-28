import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SQLiteService } from '../services/sqlite.service';

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

  async ingresar () {
    if(!this.usuario || !this.password) {
      const t = await this.toastCtrl.create({
        message: 'Completa cada campo con tu usuario y tu contraseña',
        duration: 1500,
        position: 'top'
      });
      return t.present();
    }

    const user = await this.sqliteService.getUser(this.usuario);
    if (!user || user.password !== this.password) {
      const t = await this.toastCtrl.create({
        message: 'Usuario no encontrado o contraseña incorrecta',
        duration: 1500,
        position: 'top'
      });
      return t.present();
    }

    await this.storage.set('isLoggedIn', true);
    await this.storage.set('usuario', this.usuario);

    this.router.navigate(['/inicio'], {state: { usuario: this.usuario} });
  }

  irRestablecer() {
    this.router.navigate(['/restablecer-contrasena']);
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }
}
