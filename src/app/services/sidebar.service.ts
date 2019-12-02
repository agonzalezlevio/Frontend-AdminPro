import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  constructor(public usuarioService: UsuarioService) {

   }

   public cargarMenu() {
    this.menu = this.usuarioService.menu;
   }
}
