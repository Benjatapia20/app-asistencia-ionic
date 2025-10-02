import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private _storage: Storage | null = null;

    constructor(private router: Router, private storage: Storage) {
        this.init();
    }

    async init() {
        this._storage = await this.storage.create();
    }

    async canActivate(): Promise<boolean> {
        const isLoggedIn = await this.storage.get('isLoggedIn');

        if (isLoggedIn) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}