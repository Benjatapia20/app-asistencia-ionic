import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.pages.scss'],
})
//InicioPage es la página principal después de la página Login.
export class InicioPage implements OnInit, OnDestroy {
    usuario: string = '';
    aforoActual = 0;
    eventos: string[] = ['Concierto Indie', 'Feria De Libros', 'Obra De Teatro'];
    private timer?: any;

    constructor(private router: Router) {}

    ngOnInit() {
        //Se recupera el usuario (Si existe) enviado desde el login
        const nav = this.router.getCurrentNavigation();
        this.usuario = (nav?.extras.state as any)?.usuario ?? 'usuario';

        //Se simulan cambios del estado del aforo en tiempo real
        this.timer = setInterval(() => {
            this.aforoActual = (this.aforoActual + Math.floor(Math.random() *5)) % 500;
        }, 1500);
    }

    ngOnDestroy() {
        if(this.timer) clearInterval(this.timer);
    }
}