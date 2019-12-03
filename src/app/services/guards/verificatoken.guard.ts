import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificatokenGuard implements CanActivateChild {

  constructor(public usuarioService: UsuarioService){
  }


  canActivateChild(): Promise<boolean>  | boolean {
    const token = this.usuarioService.token;
    // Decodificación de la información del token, está presente en 64 bits
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expirado(payload.exp);

    if (expirado) {
      return false;
    }

    return this.verificaRenovacion(payload.exp);
  }


  public verificaRenovacion(fechaExp: number): Promise<boolean> {
    return new Promise ((resolve, reject) => {
        const tokenExp = new Date(fechaExp * 1000);
        const ahora = new Date();
        // Incremento de cuatro horas
        ahora.setTime(ahora.getTime() + ( 4 * 60 * 60 * 1000) );
     /*    console.log(tokenExp)
        console.log(ahora) */

        // Verificación vencimiento token
        if (tokenExp.getTime() > ahora.getTime()) {
          resolve(true);
        } else {
          // El token esta próximo a vencer, se renueva
          this.usuarioService.renuevaToken().subscribe(() => {
            resolve(true);
          }, () => {
            reject(false);
          });
        }

    });
  }


  public expirado(fechaExp: number) {
    // Fecha actual en segundos
    const ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }

}
