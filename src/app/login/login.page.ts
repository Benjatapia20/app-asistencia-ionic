import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage{
    email: string = '';
    password: string = '';

    constructor(private router: Router) {}
    
    login(){
        //Ingreso De Sesión Simple
        if(this.email == this.password){
            this.router.navigate(['/home']);
        } else {
            alert('Datos Inválidos. Ingrese Correo y Contraseña Válidos');
        }
    }
}