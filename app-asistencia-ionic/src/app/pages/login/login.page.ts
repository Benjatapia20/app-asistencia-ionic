import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private sqliteService: SQLiteService
  ) {}

  async login() {
    if (!this.usuario || !this.password) {
      return this.mostrarToast('Completa ambos campos.');
    }

    try {
      // Buscar el usuario en la base de datos
      const user = await this.sqliteService.getUser(this.usuario);

      if (!user) {
        return this.mostrarToast('Usuario no encontrado.');
      }

      if (user.password !== this.password) {
        return this.mostrarToast('Contraseña incorrecta.');
      }

      await this.mostrarToast('Inicio de sesión exitoso.');

      // Redirige a la página de inicio
      this.router.navigate(['/inicio']);

      // Limpia los campos
      this.usuario = '';
      this.password = '';

    } catch (err) {
      console.error('Error en el inicio de sesión', err);
      this.mostrarToast('Error al iniciar sesión.');
    }
  }

  async irARegistro() {
    this.router.navigate(['/registro']);
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