//AuthGuard es el encargado de proteger las rutas del sistema.
//Verifica si el usuario tiene una sesión ya iniciada.
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";

@Injectable({
  //El "root" hace que dicho guard esté disponible en toda la aplicación.
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private _storage: Storage | null = null;

    constructor(private router: Router, private storage: Storage) {
      //El almacenamiento sólo se inicializa apenas se crea el guard.
        this.init();
    }

    //El almacenamiento de Ionic Storage se inicializa (Persistencia Local)
    async init() {
        this._storage = await this.storage.create();
    }

    //El método "canActivate" determina si se puede acceder a una ruta.
    async canActivate(): Promise<boolean> {
        //El isLoggedIn verifica si el usuario ya tiene una sección iniciada.
        const isLoggedIn = await this.storage.get('isLoggedIn');

        //Si el usuario está logeado, el acceso es permitido
        //De lo contrario, se redirige a la página login
        if (isLoggedIn) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
