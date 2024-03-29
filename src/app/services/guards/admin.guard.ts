import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor( 
    public usuarioService: UsuarioService,
    public router: Router
    ) {  }

  canActivate() {
    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    }else {
      console.log('Bloqueado por el AdminGuard')
      this.router.navigate(['/dashboard'])
      return false;
    }
  }
}
