import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  canActivate() {
    if (this.usuarioService.estaLogeado()) {
      // console.log('Paso por el Guard');
      return true;
    } else {
      // console.log('No Paso por el Guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
