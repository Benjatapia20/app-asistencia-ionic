import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";

@Injectable({
    //Root es el guard que está siempre disponible en toda la app
    providedIn: 'root'
})
export class StartGuard implements CanActivate {
    private _storage: Storage | null = null;
    //Instancia de Storage para manejar la persistencia

    constructor(private router: Router, private storage: Storage) {
        this.init();
    //Se inicializa el Storage al crear el guard
    }

    //Inicialización del Storage
    async init(): Promise<void> {
        this._storage = await this.storage.create();
    }

    //Método que va a decidir si la ruta puede activarse
    //Si la instancia del Storage no existe, se inicializa
    async canActivate(): Promise<boolean> {
        if(!this._storage) {
            await this.init();
        }

        //Se intenta obtener al usuario si inició sesión.
        const isLoggedIn = await this._storage?.get('isLoggedIn');

        //Retorna FALSE si el usuario está logueado, redirigiendo al inicio
        //Retorna TRUE si el usuario no está loguado, permitiendo acceder a la ruta del login
        if(isLoggedIn) {
            this.router.navigateByUrl('/inicio');
            return false;
        }
        return true;
        //FALSE bloquea el acceso a la ruta actual
        //TRUE permite acceder a la ruta actual
    }
}