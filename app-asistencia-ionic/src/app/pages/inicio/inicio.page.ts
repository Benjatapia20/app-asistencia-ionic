import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";
import { SQLiteService } from "../services/sqlite.service";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
    standalone: false,
})
export class InicioPage implements OnInit, OnDestroy {
    usuario: string = '';
    aforoActual = 0;
    eventos: string [] = ['Concierto Indie', 'Feria De Libros', 'Obra De Teatro'];
    private timer?: any;

    constructor(
        private router: Router,
        private storage: Storage,
        private sqliteService: SQLiteService
    ) {
        this.initStorage();
    }

    async initStorage() {
        await this.storage.create();
    }

    async ngOnInit() {
        //Se recupera el usuario enviado desde el login si existe
        const nav = this.router.getCurrentNavigation();
        this.usuario = (nav?.extras.state as any)?.usuario ?? 'usuario';

        //Se recuperan los datos del usuario guardados en SQLite
        const user = await this.sqliteService.getUser(this.usuario);
        if (user) {
            this.usuario = user.username;
        }

        //Se simulan cambios en el aforo en tiempo real
        this.timer = setInterval(() => {
            this.aforoActual = (this.aforoActual + Math.floor(Math.random() * 5)) % 500;
        }, 1500);
    }

    ngOnDestroy() {
        if (this.timer) clearInterval(this.timer);
        //Si ya no es necesaria, la conexión SQLite se cierra
        this.sqliteService.closeDB();
    }

    async logout() {
        await this.storage.remove('isLoggedIn');
        await this.storage.remove('usuario');
        this.router.navigate(['/login']);
    }
}